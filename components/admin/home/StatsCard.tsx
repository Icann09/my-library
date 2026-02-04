import { fetchStatsData } from "@/lib/data";

export default async function StatsCard() {
  const statsData = await fetchStatsData();
  const statsArray = Object.entries(statsData);

  return (
    <>
      {statsArray.map(([key, { title, value, total }]) => {
        const isIncrease = value > 0;

        return (
          <div
            key={key}
            className="w-1/3 h-[90px] p-[14px] rounded-md flex flex-col justify-around bg-white"
          >
            <p className="text-base font-medium text-left">
              {title}{" "}
              {value !== 0 ? (
                <span className={isIncrease ? "text-green-500" : "text-red-500"}>
                  {isIncrease ? "▲" : "▼"} {Math.abs(value)}
                </span>
              ) : (
                <span className="text-gray-500"> --</span>
              )}
            </p>

            <p className="text-3xl font-ibm-plex-sans font-[600]">
              {total}
            </p>
          </div>
        );
      })}
    </>
  );
}

