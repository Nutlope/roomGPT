export type themeType =
  | "Modern"
  | "Vintage"
  | "Minimalist"
  | "Professional"
  | "Tropical"
  | "Industrial"
  | "Vastu"
  | "Neoclassic";

export type roomType =
  | "Living Room"
  | "Dining Room"
  | "Bedroom"
  | "Bathroom"
  | "Office"
  | "Kitchen"
  | "Basement"
  // | "Outdoor Patio"
  | "Gaming Room";

export const themes: themeType[] = [
  "Modern",
  "Minimalist",
  "Professional",
  "Tropical",
  "Vintage",
  "Industrial",
  "Vastu",
  "Neoclassic",
];
export const rooms: roomType[] = [
  "Living Room",
  "Dining Room",
  "Office",
  "Bedroom",
  "Bathroom",
  "Basement",
  "Kitchen",
  "Gaming Room",
  // "Outdoor Patio",
];
