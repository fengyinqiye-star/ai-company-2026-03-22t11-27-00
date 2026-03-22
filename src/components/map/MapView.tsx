"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Spot } from "@/types";
import { MAP_CONFIG } from "@/lib/constants";
import SpotMarker from "@/components/map/SpotMarker";
import NumberedMarker from "@/components/map/NumberedMarker";
import RoutePolyline from "@/components/map/RoutePolyline";

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)["_getIconUrl"];
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface MapViewProps {
  center: { lat: number; lng: number };
  zoom: number;
  spots: Spot[];
  selectedSpots: Spot[];
  onSpotClick: (spot: Spot) => void;
}

function FitBoundsUpdater({ selectedSpots }: { selectedSpots: Spot[] }) {
  const map = useMap();

  useEffect(() => {
    if (selectedSpots.length >= 2) {
      const bounds = L.latLngBounds(
        selectedSpots.map((s) => [s.position.lat, s.position.lng])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, selectedSpots]);

  return null;
}

export default function MapView({
  center,
  zoom,
  spots,
  selectedSpots,
  onSpotClick,
}: MapViewProps) {
  const selectedIds = new Set(selectedSpots.map((s) => s.id));
  const unselectedSpots = spots.filter((s) => !selectedIds.has(s.id));

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={zoom}
      minZoom={MAP_CONFIG.minZoom}
      maxZoom={MAP_CONFIG.maxZoom}
      className="h-full w-full min-h-[400px] rounded-lg"
      aria-label="観光スポット地図"
    >
      <TileLayer
        attribution={MAP_CONFIG.attribution}
        url={MAP_CONFIG.tileUrl}
      />
      <FitBoundsUpdater selectedSpots={selectedSpots} />

      {unselectedSpots.map((spot) => (
        <SpotMarker
          key={spot.id}
          spot={spot}
          onClick={() => onSpotClick(spot)}
        />
      ))}

      {selectedSpots.map((spot, index) => (
        <NumberedMarker
          key={spot.id}
          spot={spot}
          orderNumber={index + 1}
          onClick={() => onSpotClick(spot)}
        />
      ))}

      <RoutePolyline selectedSpots={selectedSpots} />
    </MapContainer>
  );
}
