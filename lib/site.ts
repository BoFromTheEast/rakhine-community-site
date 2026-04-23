export const site = {
  name: "Rakhine Water Festival - Des Moines",
  shortName: "Rakhine Water Festival",
  description:
    "Celebrate Thingyan, the Burmese New Year water festival, with the Rakhine community of Des Moines, Iowa.",
  url: "https://rakhinedsm.org",
  contactEmail: "hello@rakhinedsm.org",
  localeDefault: "en",
  event: {
    year: new Date().getFullYear(),
    city: "Des Moines",
    state: "Iowa",
    country: "USA",
    seasonLabel: "July - Thingyan Season",
    venue: {
      status: "to-be-announced",
      name: "To Be Announced",
      line1: "Address: Coming Soon",
      cityState: "Des Moines, Iowa",
      note: "We will publish the exact venue and address here once confirmed.",
      mapUrl: "",
    },
  },
  social: {
    ogImage: "/globe.svg",
  },
} as const;

export function getCopyrightYear() {
  return new Date().getFullYear();
}
