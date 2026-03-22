import { useState, useCallback } from "react";
import type { Spot } from "@/types";

interface RouteManager {
  selectedSpots: Spot[];
  toggleSpot: (spot: Spot) => void;
  reorderSpots: (fromIndex: number, toIndex: number) => void;
  clearRoute: () => void;
  isSelected: (spotId: string) => boolean;
  getOrderNumber: (spotId: string) => number | undefined;
}

export function useRouteManager(): RouteManager {
  const [selectedSpots, setSelectedSpots] = useState<Spot[]>([]);

  const toggleSpot = useCallback((spot: Spot) => {
    setSelectedSpots((prev) => {
      const exists = prev.find((s) => s.id === spot.id);
      if (exists) {
        return prev.filter((s) => s.id !== spot.id);
      }
      return [...prev, spot];
    });
  }, []);

  const reorderSpots = useCallback((fromIndex: number, toIndex: number) => {
    setSelectedSpots((prev) => {
      if (
        fromIndex < 0 ||
        fromIndex >= prev.length ||
        toIndex < 0 ||
        toIndex >= prev.length
      ) {
        return prev;
      }
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  }, []);

  const clearRoute = useCallback(() => {
    setSelectedSpots([]);
  }, []);

  const isSelected = useCallback(
    (spotId: string) => selectedSpots.some((s) => s.id === spotId),
    [selectedSpots]
  );

  const getOrderNumber = useCallback(
    (spotId: string) => {
      const index = selectedSpots.findIndex((s) => s.id === spotId);
      return index >= 0 ? index + 1 : undefined;
    },
    [selectedSpots]
  );

  return {
    selectedSpots,
    toggleSpot,
    reorderSpots,
    clearRoute,
    isSelected,
    getOrderNumber,
  };
}
