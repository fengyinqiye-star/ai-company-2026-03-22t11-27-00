"use client";

import { Marker, Popup } from "react-leaflet";
import type { Spot } from "@/types";

interface SpotMarkerProps {
  spot: Spot;
  onClick: () => void;
}

export default function SpotMarker({ spot, onClick }: SpotMarkerProps) {
  return (
    <Marker
      position={[spot.position.lat, spot.position.lng]}
      eventHandlers={{ click: onClick }}
    >
      <Popup>
        <div>
          <strong>{spot.name}</strong>
          <p className="mt-1 text-sm">{spot.description}</p>
        </div>
      </Popup>
    </Marker>
  );
}
