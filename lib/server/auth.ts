import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { readJsonFile, writeJsonFile } from "@/lib/server/jsonStore";

const USERS_FILE = "users.json";
const SESSIONS_FILE = "sessions.json";
const PASSWORD_RESETS_FILE = "password-resets.json";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
const PASSWORD_RESET_MAX_AGE_SECONDS = 60 * 60;
export const SESSION_COOKIE_NAME = "rcw_session";

type UserRecord = {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
};

type SessionRecord = {
  token: string;
  userId: string;
  expiresAt: number;
};

type PasswordResetRecord = {
  token: string;
  userId: string;
  expiresAt: number;
};

export type SessionUser = {
  id: string;
  email: string;
};

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const digest = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${digest}`;
}

function verifyPassword(password: string, passwordHash: string): boolean {
  const [salt, digest] = passwordHash.split(":");
  if (!salt || !digest) return false;

  const suppliedDigest = scryptSync(password, salt, 64);
  const storedDigest = Buffer.from(digest, "hex");

  if (suppliedDigest.length !== storedDigest.length) {
    return false;
  }

  return timingSafeEqual(suppliedDigest, storedDigest);
}

async function readUsers(): Promise<UserRecord[]> {
  return readJsonFile<UserRecord[]>(USERS_FILE, []);
}

async function writeUsers(users: UserRecord[]): Promise<void> {
  await writeJsonFile<UserRecord[]>(USERS_FILE, users);
}

async function readSessions(): Promise<SessionRecord[]> {
  return readJsonFile<SessionRecord[]>(SESSIONS_FILE, []);
}

async function writeSessions(sessions: SessionRecord[]): Promise<void> {
  await writeJsonFile<SessionRecord[]>(SESSIONS_FILE, sessions);
}

async function readPasswordResets(): Promise<PasswordResetRecord[]> {
  return readJsonFile<PasswordResetRecord[]>(PASSWORD_RESETS_FILE, []);
}

async function writePasswordResets(records: PasswordResetRecord[]): Promise<void> {
  await writeJsonFile<PasswordResetRecord[]>(PASSWORD_RESETS_FILE, records);
}

export async function registerUser(rawEmail: string, password: string): Promise<SessionUser> {
  const email = normalizeEmail(rawEmail);
  const users = await readUsers();
  const alreadyExists = users.some((user) => user.email === email);

  if (alreadyExists) {
    throw new Error("An account with this email already exists.");
  }

  const user: UserRecord = {
    id: randomBytes(12).toString("hex"),
    email,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  await writeUsers(users);

  return { id: user.id, email: user.email };
}

export async function validateCredentials(
  rawEmail: string,
  password: string,
): Promise<SessionUser | null> {
  const email = normalizeEmail(rawEmail);
  const users = await readUsers();
  const user = users.find((item) => item.email === email);

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return null;
  }

  return { id: user.id, email: user.email };
}

export async function createSession(userId: string): Promise<string> {
  const token = randomBytes(32).toString("hex");
  const sessions = await readSessions();
  const now = Date.now();
  const validSessions = sessions.filter((session) => session.expiresAt > now);

  validSessions.push({
    token,
    userId,
    expiresAt: now + SESSION_MAX_AGE_SECONDS * 1000,
  });

  await writeSessions(validSessions);
  return token;
}

export async function getSessionUser(token: string | undefined): Promise<SessionUser | null> {
  if (!token) return null;

  const sessions = await readSessions();
  const users = await readUsers();
  const now = Date.now();
  const validSessions = sessions.filter((session) => session.expiresAt > now);

  if (validSessions.length !== sessions.length) {
    await writeSessions(validSessions);
  }

  const activeSession = validSessions.find((session) => session.token === token);
  if (!activeSession) return null;

  const user = users.find((item) => item.id === activeSession.userId);
  if (!user) return null;

  return { id: user.id, email: user.email };
}

export async function clearSession(token: string | undefined): Promise<void> {
  if (!token) return;

  const sessions = await readSessions();
  const nextSessions = sessions.filter((session) => session.token !== token);
  await writeSessions(nextSessions);
}

export function getSessionMaxAgeSeconds(): number {
  return SESSION_MAX_AGE_SECONDS;
}

export async function createPasswordResetToken(rawEmail: string): Promise<string | null> {
  const email = normalizeEmail(rawEmail);
  const users = await readUsers();
  const user = users.find((item) => item.email === email);

  if (!user) {
    return null;
  }

  const now = Date.now();
  const token = randomBytes(32).toString("hex");
  const existingResets = await readPasswordResets();
  const nextResets = existingResets.filter(
    (record) => record.expiresAt > now && record.userId !== user.id,
  );

  nextResets.push({
    token,
    userId: user.id,
    expiresAt: now + PASSWORD_RESET_MAX_AGE_SECONDS * 1000,
  });

  await writePasswordResets(nextResets);
  return token;
}

export async function resetPasswordWithToken(
  token: string,
  newPassword: string,
): Promise<boolean> {
  const now = Date.now();
  const resets = await readPasswordResets();
  const validResets = resets.filter((record) => record.expiresAt > now);
  const resetRecord = validResets.find((record) => record.token === token);

  if (!resetRecord) {
    if (validResets.length !== resets.length) {
      await writePasswordResets(validResets);
    }
    return false;
  }

  const users = await readUsers();
  const userIndex = users.findIndex((user) => user.id === resetRecord.userId);
  if (userIndex === -1) {
    return false;
  }

  users[userIndex] = {
    ...users[userIndex],
    passwordHash: hashPassword(newPassword),
  };
  await writeUsers(users);

  const remainingResets = validResets.filter((record) => record.token !== token);
  await writePasswordResets(remainingResets);

  // Invalidate existing sessions after password change.
  const sessions = await readSessions();
  const remainingSessions = sessions.filter((session) => session.userId !== resetRecord.userId);
  await writeSessions(remainingSessions);

  return true;
}
