"use client";

import type { Area } from "@/types";
import { useAreaSearch } from "@/hooks/useAreaSearch";

interface SearchBarProps {
  areas: Area[];
}

export default function SearchBar({ areas }: SearchBarProps) {
  const {
    query,
    setQuery,
    filteredAreas,
    isOpen,
    highlightIndex,
    handleKeyDown,
    handleSelect,
    handleClear,
    containerRef,
  } = useAreaSearch(areas);

  const showNoResults = query.length > 0 && filteredAreas.length === 0;

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-lg">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-travel-text-muted">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="エリア名を入力（例: 東京）"
          className="w-full rounded-card border border-travel-border bg-white pl-11 pr-10 py-3.5 font-body text-travel-text-primary placeholder:text-travel-text-muted shadow-[0_2px_8px_rgba(30,27,22,0.06)] focus:border-jade-500 focus:outline-none focus:ring-2 focus:ring-jade-500/20 transition-all duration-200"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="area-suggest-list"
          aria-haspopup="listbox"
          aria-label="エリア検索"
        />
        {query.length > 0 && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-travel-text-muted hover:text-travel-text-secondary transition-colors duration-150"
            aria-label="検索をクリア"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      {isOpen && (
        <ul
          id="area-suggest-list"
          role="listbox"
          className="absolute z-10 mt-1.5 w-full rounded-card border border-travel-border bg-white shadow-card-hover overflow-hidden"
        >
          {filteredAreas.map((area, index) => (
            <li
              key={area.id}
              role="option"
              aria-selected={index === highlightIndex}
              className={`cursor-pointer px-4 py-3 font-body transition-colors duration-150 ${
                index === highlightIndex
                  ? "bg-jade-50 text-jade-700"
                  : "hover:bg-travel-bg-alt"
              }`}
              onClick={() => handleSelect(area)}
            >
              <span className="font-medium">{area.name}</span>
              <span className="ml-2 text-sm text-travel-text-muted">{area.description}</span>
            </li>
          ))}
        </ul>
      )}

      {showNoResults && (
        <div className="absolute z-10 mt-1.5 w-full rounded-card border border-travel-border bg-white px-4 py-3 font-body text-sm text-travel-text-muted shadow-card">
          対応エリアが見つかりません
        </div>
      )}
    </div>
  );
}
