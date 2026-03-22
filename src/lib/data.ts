import type { Area, Spot } from "@/types";
import areasData from "@/data/areas.json";

/** Get all areas */
export function getAllAreas(): Area[] {
  return areasData as Area[];
}

/** Get area by ID */
export function getAreaById(areaId: string): Area | undefined {
  return getAllAreas().find((a) => a.id === areaId);
}

/** Get spots by area ID */
export async function getSpotsByAreaId(areaId: string): Promise<Spot[]> {
  try {
    const data = await import(`@/data/spots/${areaId}.json`);
    return data.default as Spot[];
  } catch {
    return [];
  }
}

/** Get all area IDs for static params */
export function getAllAreaIds(): string[] {
  return getAllAreas().map((a) => a.id);
}
