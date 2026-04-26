import { unlink } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, SESSION_COOKIE_NAME } from "@/lib/server/auth";
import {
  deleteFestivalPhotoById,
  getFestivalPhotoById,
} from "@/lib/server/festivalPhotos";

type RouteContext = {
  params: Promise<{ photoId: string }>;
};

export async function DELETE(request: NextRequest, context: RouteContext) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const user = await getSessionUser(token);

  if (!user) {
    return NextResponse.json({ error: "Please log in first." }, { status: 401 });
  }

  const { photoId } = await context.params;
  const targetPhoto = await getFestivalPhotoById(photoId);

  if (!targetPhoto) {
    return NextResponse.json({ error: "Photo not found." }, { status: 404 });
  }

  if (targetPhoto.uploadedBy !== user.email) {
    return NextResponse.json(
      { error: "You can only delete your own uploads." },
      { status: 403 },
    );
  }

  const deletedPhoto = await deleteFestivalPhotoById(photoId);
  if (!deletedPhoto) {
    return NextResponse.json({ error: "Photo not found." }, { status: 404 });
  }

  const uploadRoot = path.join(process.cwd(), "public");
  const diskPath = path.join(uploadRoot, deletedPhoto.imageUrl.replace(/^\/+/, ""));

  await unlink(diskPath).catch(() => {
    // Ignore file system errors to avoid blocking metadata cleanup.
  });

  return NextResponse.json({ ok: true, deletedPhotoId: photoId });
}
