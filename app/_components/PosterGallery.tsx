"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../page.module.css";

type Poster = {
  title: string;
  detail: string;
  imageSrc: string;
};

type Props = {
  posters: Poster[];
};

export default function PosterGallery({ posters }: Props) {
  const [activePoster, setActivePoster] = useState<Poster | null>(null);

  useEffect(() => {
    if (!activePoster) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActivePoster(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activePoster]);

  return (
    <>
      <div className={styles.posterGrid}>
        {posters.map((poster, index) => (
          <article className={styles.posterCard} key={poster.title}>
            <button
              type="button"
              className={styles.posterButton}
              onClick={() => setActivePoster(poster)}
              aria-label={`View ${poster.title} full size`}
            >
              <span className={styles.posterPreview}>
                <Image
                  src={poster.imageSrc}
                  alt={poster.title}
                  fill
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                />
              </span>
              <span className={styles.posterText}>
                <strong>{poster.title}</strong>
                <span>{poster.detail}</span>
              </span>
            </button>
          </article>
        ))}
      </div>

      {activePoster && (
        <div
          className={styles.posterOverlay}
          role="dialog"
          aria-modal="true"
          aria-label={activePoster.title}
        >
          <button
            type="button"
            className={styles.posterBackdrop}
            onClick={() => setActivePoster(null)}
            aria-label="Close poster preview"
          />
          <div className={styles.posterModal}>
            <div className={styles.posterModalHeader}>
              <div>
                <p>Flyer Preview</p>
                <h3>{activePoster.title}</h3>
              </div>
              <button
                type="button"
                className={styles.posterClose}
                onClick={() => setActivePoster(null)}
                aria-label="Close poster preview"
              >
                ×
              </button>
            </div>
            <div className={styles.posterFullImage}>
              <Image
                src={activePoster.imageSrc}
                alt={activePoster.title}
                fill
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
