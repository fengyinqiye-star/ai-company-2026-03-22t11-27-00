import areasData from "@/data/areas.json";
import tokyoSpots from "@/data/spots/tokyo.json";
import kyotoSpots from "@/data/spots/kyoto.json";
import osakaSpots from "@/data/spots/osaka.json";
import okinawaSpots from "@/data/spots/okinawa.json";
import hokkaidoSpots from "@/data/spots/hokkaido.json";
import type { SpotCategory } from "@/types";

const VALID_CATEGORIES: SpotCategory[] = [
  "shrine_temple",
  "nature",
  "gourmet",
  "experience",
  "shopping",
  "history",
  "scenery",
];

const allSpotSets = {
  tokyo: tokyoSpots,
  kyoto: kyotoSpots,
  osaka: osakaSpots,
  okinawa: okinawaSpots,
  hokkaido: hokkaidoSpots,
};

describe("Mock Data Integrity", () => {
  describe("areas.json", () => {
    it("should have exactly 5 areas", () => {
      expect(areasData).toHaveLength(5);
    });

    it("each area should have valid structure", () => {
      for (const area of areasData) {
        expect(typeof area.id).toBe("string");
        expect(typeof area.name).toBe("string");
        expect(typeof area.description).toBe("string");
        expect(typeof area.center.lat).toBe("number");
        expect(typeof area.center.lng).toBe("number");
        expect(typeof area.zoom).toBe("number");
        expect(area.zoom).toBeGreaterThanOrEqual(1);
        expect(area.zoom).toBeLessThanOrEqual(20);
      }
    });

    it("each area should have valid coordinates", () => {
      for (const area of areasData) {
        expect(area.center.lat).toBeGreaterThanOrEqual(-90);
        expect(area.center.lat).toBeLessThanOrEqual(90);
        expect(area.center.lng).toBeGreaterThanOrEqual(-180);
        expect(area.center.lng).toBeLessThanOrEqual(180);
      }
    });

    it("area IDs should be unique", () => {
      const ids = areasData.map((a: any) => a.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  describe("spot data files", () => {
    for (const [areaId, spots] of Object.entries(allSpotSets)) {
      describe(`${areaId}.json`, () => {
        it("should have at least 5 spots", () => {
          expect(spots.length).toBeGreaterThanOrEqual(5);
        });

        it("all spots should have correct areaId", () => {
          for (const spot of spots) {
            expect(spot.areaId).toBe(areaId);
          }
        });

        it("all spots should have valid structure", () => {
          for (const spot of spots) {
            expect(typeof spot.id).toBe("string");
            expect(typeof spot.name).toBe("string");
            expect(typeof spot.description).toBe("string");
            expect(typeof spot.duration).toBe("string");
            expect(typeof spot.position.lat).toBe("number");
            expect(typeof spot.position.lng).toBe("number");
          }
        });

        it("all spots should have valid categories", () => {
          for (const spot of spots) {
            expect(VALID_CATEGORIES).toContain(spot.category);
          }
        });

        it("all spots should have valid coordinates", () => {
          for (const spot of spots) {
            expect(spot.position.lat).toBeGreaterThanOrEqual(-90);
            expect(spot.position.lat).toBeLessThanOrEqual(90);
            expect(spot.position.lng).toBeGreaterThanOrEqual(-180);
            expect(spot.position.lng).toBeLessThanOrEqual(180);
          }
        });

        it("spot IDs should be unique", () => {
          const ids = spots.map((s: any) => s.id);
          expect(new Set(ids).size).toBe(ids.length);
        });
      });
    }
  });
});
