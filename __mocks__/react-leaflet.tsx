import React from "react";

export const MapContainer = ({ children, ...props }: any) => (
  <div data-testid="map-container" {...props}>
    {children}
  </div>
);

export const TileLayer = (props: any) => (
  <div data-testid="tile-layer" />
);

export const Marker = ({ children, eventHandlers, ...props }: any) => (
  <div
    data-testid="marker"
    onClick={eventHandlers?.click}
  >
    {children}
  </div>
);

export const Popup = ({ children }: any) => (
  <div data-testid="popup">{children}</div>
);

export const Polyline = (props: any) => (
  <div data-testid="polyline" />
);

export const useMap = () => ({
  fitBounds: jest.fn(),
  setView: jest.fn(),
});
