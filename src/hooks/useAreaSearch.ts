"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Area } from "@/types";

interface AreaSearch {
  query: string;
  setQuery: (q: string) => void;
  filteredAreas: Area[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  highlightIndex: number;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  handleSelect: (area: Area) => void;
  handleClear: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

export function useAreaSearch(areas: Area[]): AreaSearch {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null!);

  const filteredAreas = useMemo(() => {
    if (query.length === 0) return [];
    return areas.filter((a) => a.name.includes(query));
  }, [areas, query]);

  useEffect(() => {
    setIsOpen(query.length > 0 && filteredAreas.length > 0);
    setHighlightIndex(-1);
  }, [query, filteredAreas.length]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = useCallback(
    (area: Area) => {
      setQuery(area.name);
      setIsOpen(false);
      router.push(`/area/${area.id}`);
    },
    [router]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) return;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightIndex((prev) =>
            prev < filteredAreas.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          if (highlightIndex >= 0) {
            handleSelect(filteredAreas[highlightIndex]);
          } else if (filteredAreas.length === 1) {
            handleSelect(filteredAreas[0]);
          }
          break;
        case "Escape":
          setIsOpen(false);
          break;
      }
    },
    [isOpen, filteredAreas, highlightIndex, handleSelect]
  );

  const handleClear = useCallback(() => {
    setQuery("");
    setIsOpen(false);
    setHighlightIndex(-1);
  }, []);

  return {
    query,
    setQuery,
    filteredAreas,
    isOpen,
    setIsOpen,
    highlightIndex,
    handleKeyDown,
    handleSelect,
    handleClear,
    containerRef,
  };
}
