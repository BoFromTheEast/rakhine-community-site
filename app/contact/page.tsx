import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the Rakhine Water Festival committee for tickets, sponsorship, and volunteer opportunities.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
