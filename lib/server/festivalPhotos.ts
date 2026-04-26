import { randomBytes } from "node:crypto";
import { readJsonFile, writeJsonFile } from "@/lib/server/jsonStore";

const PHOTOS_FILE = "festival-photos.json";

export type FestivalPhoto = {
  id: string;
  year: number;
  description: string;
  imageUrl: string;
  uploadedBy: string;
  createdAt: string;
};

type StoredFestivalPhoto = FestivalPhoto & {
  caption?: string;
};

function normalizePhoto(photo: StoredFestivalPhoto): FestivalPhoto {
  return {
    id: photo.id,
    year: photo.year,
    description: String(photo.description ?? photo.caption ?? "").trim(),
    imageUrl: photo.imageUrl,
    uploadedBy: photo.uploadedBy,
    createdAt: photo.createdAt,
  };
}

export async function listFestivalPhotos(year?: number): Promise<FestivalPhoto[]> {
  const photos = await readJsonFile<StoredFestivalPhoto[]>(PHOTOS_FILE, []);
  return photos
    .map(normalizePhoto)
    .filter((photo) => (typeof year === "number" ? photo.year === year : true))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addFestivalPhoto(
  input: Omit<FestivalPhoto, "id" | "createdAt">,
): Promise<FestivalPhoto> {
  const photos = await readJsonFile<StoredFestivalPhoto[]>(PHOTOS_FILE, []);

  const photo: StoredFestivalPhoto = {
    ...input,
    id: randomBytes(12).toString("hex"),
    createdAt: new Date().toISOString(),
  };

  photos.push(photo);
  await writeJsonFile(PHOTOS_FILE, photos);
  return normalizePhoto(photo);
}

export async function getFestivalPhotoById(photoId: string): Promise<FestivalPhoto | null> {
  const photos = await readJsonFile<StoredFestivalPhoto[]>(PHOTOS_FILE, []);
  const photo = photos.find((item) => item.id === photoId);
  return photo ? normalizePhoto(photo) : null;
}

export async function deleteFestivalPhotoById(photoId: string): Promise<FestivalPhoto | null> {
  const photos = await readJsonFile<StoredFestivalPhoto[]>(PHOTOS_FILE, []);
  const targetPhoto = photos.find((photo) => photo.id === photoId) ?? null;

  if (!targetPhoto) {
    return null;
  }

  const nextPhotos = photos.filter((photo) => photo.id !== photoId);
  await writeJsonFile(PHOTOS_FILE, nextPhotos);
  return normalizePhoto(targetPhoto);
}
