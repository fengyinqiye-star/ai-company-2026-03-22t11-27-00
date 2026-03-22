"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { Area, Spot, MobileTab } from "@/types";
import { useRouteManager } from "@/hooks/useRouteManager";
import SpotList from "@/components/spot/SpotList";
import MobileTabSwitcher from "@/components/spot/MobileTabSwitcher";
import RoutePanel from "@/components/route/RoutePanel";

const MapView = dynamic(() => import("@/components/map/MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[400px] items-center justify-center rounded-lg bg-gray-100">
      <div className="text-center">
        <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <p className="text-sm text-gray-500">地図を読み込み中...</p>
      </div>
    </div>
  ),
});

interface SpotExplorerProps {
  area: Area;
  spots: Spot[];
}

export default function SpotExplorer({ area, spots }: SpotExplorerProps) {
  const {
    selectedSpots,
    toggleSpot,
    reorderSpots,
    clearRoute,
    getOrderNumber,
  } = useRouteManager();
  const [activeTab, setActiveTab] = useState<MobileTab>("list");

  const selectedSpotIds = selectedSpots.map((s) => s.id);

  return (
    <div>
      <MobileTabSwitcher
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedCount={selectedSpots.length}
      />

      <div className="mt-4 flex flex-col gap-4 md:flex-row">
        {/* Left column: Spot list + Route panel */}
        <div
          className={`w-full md:w-2/5 ${
            activeTab === "map" ? "hidden md:block" : ""
          }`}
        >
          <SpotList
            spots={spots}
            selectedSpotIds={selectedSpotIds}
            onToggleSpot={toggleSpot}
            getOrderNumber={getOrderNumber}
          />
          <RoutePanel
            selectedSpots={selectedSpots}
            onReorder={reorderSpots}
            onClear={clearRoute}
          />
        </div>

        {/* Right column: Map */}
        <div
          className={`w-full md:w-3/5 ${
            activeTab === "list" ? "hidden md:block" : ""
          }`}
        >
          <div className="sticky top-20 h-[calc(100vh-180px)] min-h-[400px]">
            <MapView
              center={area.center}
              zoom={area.zoom}
              spots={spots}
              selectedSpots={selectedSpots}
              onSpotClick={toggleSpot}
            />
          </div>
        </div>
      </div>

      {/* Route panel for mobile - always visible at bottom */}
      <div className="mt-4 md:hidden">
        <RoutePanel
          selectedSpots={selectedSpots}
          onReorder={reorderSpots}
          onClear={clearRoute}
        />
      </div>
    </div>
  );
}
