import type { Area } from "@/types";
import AreaCard from "@/components/area/AreaCard";

interface AreaCardListProps {
  areas: Area[];
  spotCounts: Record<string, number>;
}

export default function AreaCardList({ areas, spotCounts }: AreaCardListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {areas.map((area) => (
        <AreaCard
          key={area.id}
          area={area}
          spotCount={spotCounts[area.id] ?? 0}
        />
      ))}
    </div>
  );
}
