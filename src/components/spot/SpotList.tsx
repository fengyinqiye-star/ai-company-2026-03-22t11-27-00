import type { Spot } from "@/types";
import SpotCard from "@/components/spot/SpotCard";

interface SpotListProps {
  spots: Spot[];
  selectedSpotIds: string[];
  onToggleSpot: (spot: Spot) => void;
  getOrderNumber: (spotId: string) => number | undefined;
}

export default function SpotList({
  spots,
  selectedSpotIds,
  onToggleSpot,
  getOrderNumber,
}: SpotListProps) {
  return (
    <div className="flex flex-col gap-3 overflow-y-auto md:max-h-[calc(100vh-200px)]">
      {spots.map((spot) => (
        <SpotCard
          key={spot.id}
          spot={spot}
          isSelected={selectedSpotIds.includes(spot.id)}
          orderNumber={getOrderNumber(spot.id)}
          onToggle={() => onToggleSpot(spot)}
        />
      ))}
    </div>
  );
}
