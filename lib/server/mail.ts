import { Resend } from "resend";
import { site } from "@/lib/site";

const apiKey = process.env.RESEND_API_KEY;

export function getResendClient() {
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export function getSenderAddress() {
  return process.env.RESEND_FROM_EMAIL ?? `Rakhine Festival <no-reply@rakhinedsm.org>`;
}

export function getRecipientAddress() {
  return process.env.FORM_RECIPIENT_EMAIL ?? site.contactEmail;
}
