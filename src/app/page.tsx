import { getAllAreas, getSpotsByAreaId } from "@/lib/data";
import SearchBar from "@/components/search/SearchBar";
import AreaCardList from "@/components/search/AreaCardList";

export default async function HomePage() {
  const areas = getAllAreas();

  // Get spot counts for each area
  const spotCounts: Record<string, number> = {};
  for (const area of areas) {
    const spots = await getSpotsByAreaId(area.id);
    spotCounts[area.id] = spots.length;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
          おすすめ観光スポット
        </h1>
        <p className="text-gray-600">
          エリアを選んで、おすすめの観光スポットを見つけよう
        </p>
      </div>

      <div className="mb-10">
        <SearchBar areas={areas} />
      </div>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          エリアを選択
        </h2>
        <AreaCardList areas={areas} spotCounts={spotCounts} />
      </section>
    </div>
  );
}
