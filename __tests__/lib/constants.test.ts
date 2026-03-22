import {
  CATEGORY_LABELS,
  CATEGORY_ICONS,
  MAP_CONFIG,
  POLYLINE_OPTIONS,
} from "@/lib/constants";
import type { SpotCategory } from "@/types";

const ALL_CATEGORIES: SpotCategory[] = [
  "shrine_temple",
  "nature",
  "gourmet",
  "experience",
  "shopping",
  "history",
  "scenery",
];

describe("constants.ts", () => {
  describe("CATEGORY_LABELS", () => {
    it("should have labels for all categories", () => {
      for (const cat of ALL_CATEGORIES) {
        expect(CATEGORY_LABELS[cat]).toBeDefined();
        expect(typeof CATEGORY_LABELS[cat]).toBe("string");
        expect(CATEGORY_LABELS[cat].length).toBeGreaterThan(0);
      }
    });

    it("should have correct Japanese labels", () => {
      expect(CATEGORY_LABELS.shrine_temple).toBe("神社仏閣");
      expect(CATEGORY_LABELS.gourmet).toBe("グルメ");
      expect(CATEGORY_LABELS.nature).toBe("自然");
    });
  });

  describe("CATEGORY_ICONS", () => {
    it("should have icons for all categories", () => {
      for (const cat of ALL_CATEGORIES) {
        expect(CATEGORY_ICONS[cat]).toBeDefined();
        expect(typeof CATEGORY_ICONS[cat]).toBe("string");
      }
    });
  });

  describe("MAP_CONFIG", () => {
    it("should have tileUrl", () => {
      expect(MAP_CONFIG.tileUrl).toContain("openstreetmap.org");
    });

    it("should have attribution", () => {
      expect(MAP_CONFIG.attribution).toContain("OpenStreetMap");
    });

    it("should have valid zoom levels", () => {
      expect(MAP_CONFIG.defaultZoom).toBe(12);
      expect(MAP_CONFIG.minZoom).toBeLessThan(MAP_CONFIG.maxZoom);
      expect(MAP_CONFIG.minZoom).toBeGreaterThanOrEqual(0);
      expect(MAP_CONFIG.maxZoom).toBeLessThanOrEqual(20);
    });
  });

  describe("POLYLINE_OPTIONS", () => {
    it("should have correct color", () => {
      expect(POLYLINE_OPTIONS.color).toBe("#3B82F6");
    });

    it("should have correct weight", () => {
      expect(POLYLINE_OPTIONS.weight).toBe(3);
    });

    it("should have correct opacity", () => {
      expect(POLYLINE_OPTIONS.opacity).toBe(0.7);
    });
  });
});
