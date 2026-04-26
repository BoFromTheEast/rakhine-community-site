import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { addFestivalPhoto, listFestivalPhotos } from "@/lib/server/festivalPhotos";
import { getSessionUser, SESSION_COOKIE_NAME } from "@/lib/server/auth";

const MAX_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024;
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "festival");

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawYear = searchParams.get("year");
  const year = rawYear ? Number(rawYear) : undefined;

  const photos = await listFestivalPhotos(Number.isFinite(year) ? year : undefined);
  return NextResponse.json({ photos });
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const user = await getSessionUser(token);

  if (!user) {
    return NextResponse.json({ error: "Please log in to upload photos." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const description = String(
    formData.get("description") ?? formData.get("caption") ?? "",
  ).trim();
  const year = Number(formData.get("year"));

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Please choose an image file." }, { status: 400 });
  }

  if (!Number.isFinite(year)) {
    return NextResponse.json({ error: "A valid festival year is required." }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image uploads are allowed." }, { status: 400 });
  }

  if (!description) {
    return NextResponse.json({ error: "Please add a description for the photo." }, { status: 400 });
  }

  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    return NextResponse.json(
      { error: "Image must be 5MB or smaller." },
      { status: 400 },
    );
  }

  const extension = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
  const safeExtension = String(extension ?? "jpg").replace(/[^a-zA-Z0-9]/g, "") || "jpg";
  const fileName = `${Date.now()}-${randomUUID()}.${safeExtension.toLowerCase()}`;

  await mkdir(UPLOAD_DIR, { recursive: true });
  const filePath = path.join(UPLOAD_DIR, fileName);
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, bytes);

  const imageUrl = `/uploads/festival/${fileName}`;
  const photo = await addFestivalPhoto({
    year,
    description,
    imageUrl,
    uploadedBy: user.email,
  });

  return NextResponse.json({ ok: true, photo });
}
