import { getAllAreas, getAreaById, getSpotsByAreaId, getAllAreaIds } from "@/lib/data";

describe("data.ts", () => {
  describe("getAllAreas", () => {
    it("should return 5 areas", () => {
      const areas = getAllAreas();
      expect(areas).toHaveLength(5);
    });

    it("should return areas with required properties", () => {
      const areas = getAllAreas();
      for (const area of areas) {
        expect(area).toHaveProperty("id");
        expect(area).toHaveProperty("name");
        expect(area).toHaveProperty("description");
        expect(area).toHaveProperty("center");
        expect(area.center).toHaveProperty("lat");
        expect(area.center).toHaveProperty("lng");
        expect(area).toHaveProperty("zoom");
      }
    });

    it("should include all expected area IDs", () => {
      const areas = getAllAreas();
      const ids = areas.map((a) => a.id);
      expect(ids).toEqual(
        expect.arrayContaining(["tokyo", "kyoto", "osaka", "okinawa", "hokkaido"])
      );
    });
  });

  describe("getAreaById", () => {
    it("should return the correct area for a valid ID", () => {
      const area = getAreaById("tokyo");
      expect(area).toBeDefined();
      expect(area!.name).toBe("東京");
    });

    it("should return undefined for an invalid ID", () => {
      const area = getAreaById("nonexistent");
      expect(area).toBeUndefined();
    });

    it("should return correct area for each known ID", () => {
      const expected: Record<string, string> = {
        tokyo: "東京",
        kyoto: "京都",
        osaka: "大阪",
        okinawa: "沖縄",
        hokkaido: "北海道",
      };
      for (const [id, name] of Object.entries(expected)) {
        const area = getAreaById(id);
        expect(area).toBeDefined();
        expect(area!.name).toBe(name);
      }
    });
  });

  describe("getSpotsByAreaId", () => {
    it("should return spots for tokyo", async () => {
      const spots = await getSpotsByAreaId("tokyo");
      expect(spots.length).toBeGreaterThanOrEqual(5);
    });

    it("should return empty array for nonexistent area", async () => {
      const spots = await getSpotsByAreaId("nonexistent");
      expect(spots).toEqual([]);
    });

    it("should return spots with correct areaId", async () => {
      const spots = await getSpotsByAreaId("kyoto");
      for (const spot of spots) {
        expect(spot.areaId).toBe("kyoto");
      }
    });

    it("should return spots with required properties", async () => {
      const spots = await getSpotsByAreaId("osaka");
      for (const spot of spots) {
        expect(spot).toHaveProperty("id");
        expect(spot).toHaveProperty("areaId");
        expect(spot).toHaveProperty("name");
        expect(spot).toHaveProperty("category");
        expect(spot).toHaveProperty("description");
        expect(spot).toHaveProperty("duration");
        expect(spot).toHaveProperty("position");
        expect(spot.position).toHaveProperty("lat");
        expect(spot.position).toHaveProperty("lng");
      }
    });
  });

  describe("getAllAreaIds", () => {
    it("should return 5 area IDs", () => {
      const ids = getAllAreaIds();
      expect(ids).toHaveLength(5);
    });

    it("should return string array", () => {
      const ids = getAllAreaIds();
      for (const id of ids) {
        expect(typeof id).toBe("string");
      }
    });
  });
});
