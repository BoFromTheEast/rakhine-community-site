export type SponsorTier = {
  label: string;
  slots: string[];
};

export const sponsorTiers: SponsorTier[] = [
  { label: "Gold Sponsors", slots: ["Your Logo Here", "Your Logo Here"] },
  { label: "Silver Sponsors", slots: ["Sponsor", "Sponsor", "Sponsor"] },
  { label: "Community Supporters", slots: ["Supporter", "Supporter", "Supporter"] },
];
