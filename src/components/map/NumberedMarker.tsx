"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { Spot } from "@/types";

interface NumberedMarkerProps {
  spot: Spot;
  orderNumber: number;
  onClick: () => void;
}

function createNumberedIcon(orderNumber: number): L.DivIcon {
  return L.divIcon({
    className: "custom-numbered-marker",
    html: `<div style="
      background-color: #F97316;
      color: white;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 14px;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    ">${orderNumber}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

export default function NumberedMarker({
  spot,
  orderNumber,
  onClick,
}: NumberedMarkerProps) {
  return (
    <Marker
      position={[spot.position.lat, spot.position.lng]}
      icon={createNumberedIcon(orderNumber)}
      eventHandlers={{ click: onClick }}
    >
      <Popup>
        <div>
          <strong>
            {orderNumber}. {spot.name}
          </strong>
          <p className="mt-1 text-sm">{spot.description}</p>
        </div>
      </Popup>
    </Marker>
  );
}
