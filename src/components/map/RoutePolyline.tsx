"use client";

import { Polyline } from "react-leaflet";
import type { Spot } from "@/types";
import { POLYLINE_OPTIONS } from "@/lib/constants";

interface RoutePolylineProps {
  selectedSpots: Spot[];
}

export default function RoutePolyline({ selectedSpots }: RoutePolylineProps) {
  if (selectedSpots.length < 2) return null;

  const positions: [number, number][] = selectedSpots.map((s) => [
    s.position.lat,
    s.position.lng,
  ]);

  return <Polyline positions={positions} pathOptions={POLYLINE_OPTIONS} />;
}
