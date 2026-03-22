import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-blue-600 text-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <Link href="/" className="text-xl font-bold hover:opacity-90 md:text-2xl">
          おすすめ観光スポット
        </Link>
      </div>
    </header>
  );
}
