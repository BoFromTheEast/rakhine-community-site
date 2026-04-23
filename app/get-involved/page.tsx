import type { Metadata } from "next";
import GetInvolvedPageClient from "./GetInvolvedPageClient";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Volunteer, sponsor, or partner with the Rakhine Water Festival in Des Moines.",
};

export default function GetInvolvedPage() {
  return <GetInvolvedPageClient />;
}
