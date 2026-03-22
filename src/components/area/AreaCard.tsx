import Link from "next/link";
import type { Area } from "@/types";

interface AreaCardProps {
  area: Area;
  spotCount: number;
}

const areaGradients: Record<string, string> = {
  tokyo:    "from-slate-700 to-slate-900",
  kyoto:    "from-red-900 to-stone-800",
  osaka:    "from-orange-800 to-stone-900",
  okinawa:  "from-cyan-800 to-teal-900",
  hokkaido: "from-blue-900 to-slate-800",
};

export default function AreaCard({ area, spotCount }: AreaCardProps) {
  const gradient = areaGradients[area.id] ?? "from-stone-700 to-stone-900";

  return (
    <Link href={`/area/${area.id}`} className="group block">
      <div className="overflow-hidden rounded-card bg-white shadow-card transition-all duration-300 hover:shadow-card-hover hover:scale-[1.02]">
        {/* Image area */}
        <div className={`relative h-44 w-full bg-gradient-to-br ${gradient}`}>
          {/* Overlay pattern */}
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00em0wLTE4YzAtMi4yIDEuOC00IDQtNHM0IDEuOCA0IDQtMS44IDQtNCA0LTQtMS44LTQtNHptLTE4IDBjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00em0wIDE4YzAtMi4yIDEuOC00IDQtNHM0IDEuOCA0IDQtMS44IDQtNCA0LTQtMS44LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-heading-ja text-3xl font-bold text-white drop-shadow-lg">
              {area.name}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-heading-ja text-lg font-semibold text-travel-text-primary group-hover:text-jade-700 transition-colors duration-200">
              {area.name}
            </h3>
            <span className="rounded-full bg-jade-600 px-3 py-1 text-xs font-body font-semibold text-white">
              {spotCount} スポット
            </span>
          </div>
          <p className="mt-2 font-body text-sm text-travel-text-secondary line-clamp-2">
            {area.description}
          </p>
          <div className="mt-3 flex items-center gap-1 text-jade-600 text-sm font-body font-medium">
            <span>探索する</span>
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
