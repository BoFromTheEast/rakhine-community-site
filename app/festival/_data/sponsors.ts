export type Sponsor = {
  name: string;
  organization?: string;
  logoSrc?: string;
  website?: string;
};

// Add future sponsors here. Every sponsor is displayed at the same size.
export const sponsors: Sponsor[] = [
  { name: "JBS" },
  { name: "Ronika Htu", organization: "Rate Mortgage" },
  { name: "Thla Sui", organization: "Country Financial" },
  { name: "Golden Land Food Mart" },
  { name: "MinGaLaBar Burmese Kitchen" },
  { name: "Bonchon" },
  { name: "Bone Kyaw", organization: "Shelter" },
  { name: "Ky Zen", organization: "RE/MAX Precision" },
  { name: "Khine Thwe", organization: "Illinois Real Estate Agent" },
  { name: "Candlelight Childcare" },
  { name: "Win Urbandale Bowls" },
  { name: "Zen’s Sushi Express" },
  { name: "Ariyan Sushi" },
  { name: "New Discount Market" },
  { name: "Next Generation Vending" },
  { name: "ME Salon + Spa" },
  { name: "San Lurnn" },
];
