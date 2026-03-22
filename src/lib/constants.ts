import type { CategoryLabels, SpotCategory } from "@/types";

export const CATEGORY_LABELS: CategoryLabels = {
  shrine_temple: "神社仏閣",
  nature: "自然",
  gourmet: "グルメ",
  experience: "体験",
  shopping: "ショッピング",
  history: "歴史",
  scenery: "景観",
};

export const CATEGORY_ICONS: Record<SpotCategory, string> = {
  shrine_temple: "\u26E9\uFE0F",
  nature: "\uD83C\uDF3F",
  gourmet: "\uD83C\uDF7D\uFE0F",
  experience: "\uD83C\uDFAF",
  shopping: "\uD83D\uDECD\uFE0F",
  history: "\uD83C\uDFDB\uFE0F",
  scenery: "\uD83C\uDFD4\uFE0F",
};

export const MAP_CONFIG = {
  tileUrl: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  defaultZoom: 12,
  minZoom: 5,
  maxZoom: 18,
} as const;

export const POLYLINE_OPTIONS = {
  color: "#3B82F6",
  weight: 3,
  opacity: 0.7,
} as const;
