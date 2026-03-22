"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-stone-900/95 backdrop-blur-sm shadow-header"
          : "bg-stone-900"
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="group flex flex-col">
          <span className="font-heading-en text-xl md:text-2xl font-semibold text-white tracking-wide group-hover:text-jade-300 transition-colors duration-200">
            Japan Travel
          </span>
          <span className="font-heading-ja text-xs text-stone-400 tracking-widest">
            おすすめ観光スポット
          </span>
        </Link>
        <div className="h-0.5 w-0 group-hover:w-full bg-jade-400 transition-all duration-300" />
      </div>
    </header>
  );
}
