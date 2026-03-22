export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 px-4 py-8 mt-section-sp">
      <div className="mx-auto max-w-[1200px] flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-body text-sm">
          &copy; 2026{" "}
          <span className="font-heading-en text-stone-300 tracking-wide">Japan Travel</span>
        </p>
        <p className="font-body text-xs text-stone-500">
          Map data &copy;{" "}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            className="text-jade-500 hover:text-jade-400 transition-colors duration-200"
          >
            OpenStreetMap
          </a>{" "}
          contributors
        </p>
      </div>
    </footer>
  );
}
