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
    title: `${area.name}の観光スポット | Japan Travel`,
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
    <div>
      {/* Area hero */}
      <div className="bg-gradient-to-br from-stone-900 to-stone-800 py-10 lg:py-14">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <BackButton />
          </div>
          <h1 className="font-heading-ja text-2xl lg:text-3xl font-bold text-white mb-2">
            {area.name}の観光スポット
          </h1>
          <p className="font-body text-stone-400">{area.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-8">
        <SpotExplorer area={area} spots={spots} />
      </div>
    </div>
  );
}
