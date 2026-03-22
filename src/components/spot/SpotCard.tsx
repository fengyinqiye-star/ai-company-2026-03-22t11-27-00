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
      className={`cursor-pointer rounded-card border p-4 transition-all duration-200 ${
        isSelected
          ? "border-jade-500 bg-jade-50 ring-2 ring-jade-400/40 shadow-card"
          : "border-travel-border bg-white hover:shadow-card hover:border-stone-300"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-heading-ja font-semibold text-travel-text-primary">{spot.name}</h3>
            {isSelected && orderNumber && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-jade-600 text-xs font-bold font-body text-white shadow-sm">
                {orderNumber}
              </span>
            )}
          </div>
          <span className="mt-1.5 inline-block rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-body font-medium text-travel-text-secondary">
            {CATEGORY_ICONS[spot.category]} {CATEGORY_LABELS[spot.category]}
          </span>
          <p className="mt-2 line-clamp-2 font-body text-sm text-travel-text-secondary">
            {spot.description}
          </p>
          <p className="mt-1.5 font-body text-xs text-travel-text-muted flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {spot.duration}
          </p>
        </div>
        <div className="ml-3 flex-shrink-0">
          {isSelected ? (
            <div className="w-7 h-7 rounded-full bg-jade-600 flex items-center justify-center shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          ) : (
            <div className="w-7 h-7 rounded-full border-2 border-travel-border flex items-center justify-center hover:border-jade-400 transition-colors duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-travel-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
