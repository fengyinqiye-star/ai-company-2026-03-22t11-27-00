import type { Spot } from "@/types";
import { CATEGORY_LABELS, CATEGORY_ICONS } from "@/lib/constants";

interface SpotCardProps {
  spot: Spot;
  isSelected: boolean;
  orderNumber?: number;
  onToggle: () => void;
}

export default function SpotCard({
  spot,
  isSelected,
  orderNumber,
  onToggle,
}: SpotCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      className={`cursor-pointer rounded-lg border p-4 transition-all duration-150 ${
        isSelected
          ? "border-orange-400 bg-orange-50 ring-2 ring-orange-400"
          : "border-gray-200 bg-white hover:bg-gray-50"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">{spot.name}</h3>
            {isSelected && orderNumber && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                {orderNumber}
              </span>
            )}
          </div>
          <span className="mt-1 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
            {CATEGORY_ICONS[spot.category]} {CATEGORY_LABELS[spot.category]}
          </span>
          <p className="mt-2 line-clamp-2 text-sm text-gray-600">
            {spot.description}
          </p>
          <p className="mt-1 text-xs text-gray-500">{spot.duration}</p>
        </div>
        <div className="ml-3 flex-shrink-0">
          {isSelected ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-orange-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
