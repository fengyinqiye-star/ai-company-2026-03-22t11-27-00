"use client";

import type { Spot } from "@/types";

interface RoutePanelProps {
  selectedSpots: Spot[];
  onReorder: (fromIndex: number, toIndex: number) => void;
  onClear: () => void;
}

export default function RoutePanel({
  selectedSpots,
  onReorder,
  onClear,
}: RoutePanelProps) {
  if (selectedSpots.length === 0) return null;

  return (
    <div
      className="mt-4 rounded-lg border border-gray-200 bg-white p-4"
      aria-label="ルート情報"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">
          ルート
          <span className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
            {selectedSpots.length}
          </span>
        </h3>
        <button
          type="button"
          onClick={onClear}
          className="rounded px-3 py-1 text-sm text-red-600 hover:bg-red-50"
        >
          ルートをクリア
        </button>
      </div>

      <ul className="mt-3 space-y-2">
        {selectedSpots.map((spot, index) => (
          <li
            key={spot.id}
            className="flex items-center gap-2 rounded-md bg-gray-50 px-3 py-2"
          >
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
              {index + 1}
            </span>
            <span className="flex-1 text-sm text-gray-800">{spot.name}</span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => onReorder(index, index - 1)}
                disabled={index === 0}
                className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600 disabled:opacity-30 disabled:hover:bg-transparent"
                aria-label="上に移動"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => onReorder(index, index + 1)}
                disabled={index === selectedSpots.length - 1}
                className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600 disabled:opacity-30 disabled:hover:bg-transparent"
                aria-label="下に移動"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
