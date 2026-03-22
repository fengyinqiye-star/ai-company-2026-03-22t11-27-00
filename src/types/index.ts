/** Spot category */
export type SpotCategory =
  | "shrine_temple"
  | "nature"
  | "gourmet"
  | "experience"
  | "shopping"
  | "history"
  | "scenery";

/** Coordinates */
export interface LatLng {
  lat: number;
  lng: number;
}

/** Area data */
export interface Area {
  id: string;
  name: string;
  description: string;
  center: LatLng;
  zoom: number;
  image: string;
}

/** Spot data */
export interface Spot {
  id: string;
  areaId: string;
  name: string;
  category: SpotCategory;
  description: string;
  duration: string;
  position: LatLng;
  image?: string;
}

/** Category label type */
export type CategoryLabels = Record<SpotCategory, string>;

/** Mobile tab type */
export type MobileTab = "list" | "map";
