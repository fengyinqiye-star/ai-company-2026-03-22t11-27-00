import Link from "next/link";
import type { Area } from "@/types";

interface AreaCardProps {
  area: Area;
  spotCount: number;
}

export default function AreaCard({ area, spotCount }: AreaCardProps) {
  return (
    <Link href={`/area/${area.id}`}>
      <div className="group cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-lg">
        <div className="relative h-40 w-full bg-gradient-to-br from-blue-400 to-blue-600">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-white/80">
              {area.name}
            </span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
              {area.name}
            </h3>
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
              {spotCount} スポット
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-600">{area.description}</p>
        </div>
      </div>
    </Link>
  );
}
