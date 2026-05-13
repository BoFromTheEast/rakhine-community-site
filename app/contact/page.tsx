import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the Rakhine Water Festival committee for tickets, sponsorship, and volunteer opportunities.",
};

export default function ContactPage() {
  redirect("/get-involved");
}
