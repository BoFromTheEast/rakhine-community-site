import type { Metadata } from "next";
import FestivalPageClient from "./FestivalPageClient";

export const metadata: Metadata = {
  title: "Festival Archive",
  description: "Browse yearly highlights from the Rakhine Water Festival archive in Des Moines.",
};

export default function FestivalPage() {
  return <FestivalPageClient />;
}
