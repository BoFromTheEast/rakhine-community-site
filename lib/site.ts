export const site = {
  name: "Rakhine Water Festival - Des Moines",
  shortName: "Rakhine Water Festival",
  description:
    "Celebrate Thingyan, the Burmese New Year water festival, with the Rakhine community of Des Moines, Iowa.",
  url: "https://rakhinedsm.org",
  contactEmail: "committee@arakanrootsandrise.com",
  localeDefault: "en",
  event: {
    year: new Date().getFullYear(),
    city: "Des Moines",
    state: "Iowa",
    country: "USA",
    seasonLabel: "July - Thingyan Season",
    venue: {
      status: "confirmed",
      name: "Riverview Park",
      line1: "710 Corning Ave, Des Moines, IA 50313",
      cityState: "Des Moines, Iowa",
      note: "Join us at Riverview Park for the 2026 Rakhine Water Festival.",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=Riverview%20Park%20710%20Corning%20Ave%20Des%20Moines%20IA%2050313",
    },
  },
  social: {
    ogImage: "/globe.svg",
    instagramUrl: "https://www.instagram.com/arakanrootsandrise/",
  },
} as const;

export function getCopyrightYear() {
  return new Date().getFullYear();
}
