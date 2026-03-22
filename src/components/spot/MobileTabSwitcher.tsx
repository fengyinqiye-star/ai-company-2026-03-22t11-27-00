import type { MobileTab } from "@/types";

interface MobileTabSwitcherProps {
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
  selectedCount: number;
}

export default function MobileTabSwitcher({
  activeTab,
  onTabChange,
  selectedCount,
}: MobileTabSwitcherProps) {
  return (
    <div className="flex border-b md:hidden">
      <button
        type="button"
        onClick={() => onTabChange("list")}
        className={`flex-1 px-4 py-3 text-center text-sm font-medium transition-colors ${
          activeTab === "list"
            ? "border-b-2 border-blue-600 text-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        スポット一覧
        {selectedCount > 0 && (
          <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
            {selectedCount}
          </span>
        )}
      </button>
      <button
        type="button"
        onClick={() => onTabChange("map")}
        className={`flex-1 px-4 py-3 text-center text-sm font-medium transition-colors ${
          activeTab === "map"
            ? "border-b-2 border-blue-600 text-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        地図
      </button>
    </div>
  );
}
