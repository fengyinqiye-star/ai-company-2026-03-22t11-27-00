import { notFound } from "next/navigation";
import { getAllAreaIds, getAreaById, getSpotsByAreaId } from "@/lib/data";
import BackButton from "@/components/area/BackButton";
import SpotExplorer from "@/components/spot/SpotExplorer";

export function generateStaticParams() {
  return getAllAreaIds().map((areaId) => ({ areaId }));
}

export async function generateMetadata({
  params,
}: {
  params: { areaId: string };
}) {
  const area = getAreaById(params.areaId);
  if (!area) return { title: "エリアが見つかりません" };
  return {
    title: `${area.name}の観光スポット | おすすめ観光スポット`,
    description: area.description,
  };
}

export default async function AreaPage({
  params,
}: {
  params: { areaId: string };
}) {
  const area = getAreaById(params.areaId);
  if (!area) notFound();

  const spots = await getSpotsByAreaId(params.areaId);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-4">
        <BackButton />
      </div>
      <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
        {area.name}の観光スポット
      </h1>
      <p className="mb-6 text-gray-600">{area.description}</p>

      <SpotExplorer area={area} spots={spots} />
    </div>
  );
}
