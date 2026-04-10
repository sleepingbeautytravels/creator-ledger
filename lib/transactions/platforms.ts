export const platformOptions = [
  "Instagram",
  "YouTube",
  "TikTok",
  "Website",
  "Blog",
  "Podcast",
  "Newsletter",
  "Other"
] as const;

export type Platform = (typeof platformOptions)[number];
