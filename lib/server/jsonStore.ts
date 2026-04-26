import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");

export async function readJsonFile<T>(fileName: string, fallbackValue: T): Promise<T> {
  const filePath = path.join(DATA_DIR, fileName);

  try {
    const fileContent = await readFile(filePath, "utf8");
    return JSON.parse(fileContent) as T;
  } catch {
    return fallbackValue;
  }
}

export async function writeJsonFile<T>(fileName: string, value: T): Promise<void> {
  const filePath = path.join(DATA_DIR, fileName);
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(filePath, JSON.stringify(value, null, 2), "utf8");
}
