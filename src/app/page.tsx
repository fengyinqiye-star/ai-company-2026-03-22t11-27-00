import { getAllAreas, getSpotsByAreaId } from "@/lib/data";
import SearchBar from "@/components/search/SearchBar";
import AreaCardList from "@/components/search/AreaCardList";

export default async function HomePage() {
  const areas = getAllAreas();

  const spotCounts: Record<string, number> = {};
  for (const area of areas) {
    const spots = await getSpotsByAreaId(area.id);
    spotCounts[area.id] = spots.length;
  }

  return (
    <div>
      {/* Hero section */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 py-section-sp lg:py-section">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-heading-en text-jade-400 text-lg tracking-[0.2em] mb-3 animate-fade-in">
            Discover Japan
          </p>
          <h1 className="font-heading-ja text-hero-sp lg:text-hero font-bold text-white mb-4 animate-fade-in-up">
            おすすめ観光スポット
          </h1>
          <p className="font-body text-stone-400 text-base lg:text-lg max-w-xl mx-auto mb-10 animate-fade-in-up">
            エリアを選んで、おすすめの観光スポットを見つけよう
          </p>
          <div className="animate-fade-in-up">
            <SearchBar areas={areas} />
          </div>
        </div>
      </section>

      {/* Decorative divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-jade-500/30 to-transparent" />

      {/* Area cards section */}
      <section className="py-section-sp lg:py-section bg-travel-bg">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="font-heading-en text-section-sp lg:text-section text-travel-text-primary tracking-wide">
              Areas
            </h2>
            <p className="mt-1 font-body text-sm text-travel-text-secondary">
              エリアを選択
            </p>
            <div className="mt-3 h-0.5 w-10 bg-jade-500 rounded-full" />
          </div>
          <AreaCardList areas={areas} spotCounts={spotCounts} />
        </div>
      </section>
    </div>
  );
}
