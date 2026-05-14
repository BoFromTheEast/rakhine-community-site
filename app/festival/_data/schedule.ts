export type ScheduleItem = {
  time: string;
  title: string;
  description: string;
  tag: "Cultural" | "Water" | "Food";
};

export const scheduleItems: ScheduleItem[] = [
  {
    time: "10:00 AM",
    title: "Opening Ceremony",
    description:
      "Traditional prayers and blessings to welcome the New Year with elders leading the ritual.",
    tag: "Cultural",
  },
  {
    time: "11:00 AM",
    title: "Water Splashing Begins",
    description:
      "Bring your water guns, buckets, and smiles - everyone gets soaked.",
    tag: "Water",
  },
  {
    time: "12:30 PM",
    title: "Traditional Food Stalls",
    description: "Enjoy authentic Rakhine dishes prepared by community members.",
    tag: "Food",
  },
];
