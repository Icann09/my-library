export default function StatsCard({
  change,
  value,
  stat,
}: {
  change: number;
  value: number;
  stat: string;
}) {
  const isIncrease = change > 0;

  return (
    <div className="w-1/3 h-[90px] p-[14px] rounded-md flex flex-col  justify-around bg-white">
      <p className="text-base font-medium text-left">
        {stat}{" "}
        {change !== 0 ? (
          <span className={isIncrease ? "text-green-500" : "text-red-500"}>
            {isIncrease ? "▲" : "▼"} {Math.abs(change)}
          </span>
        ) : (
          <span className="text-gray-500"> --</span>
        )}
      </p>
      <p className="text-3xl font-ibm-plex-sans font-[600]">{value}</p>
    </div>
  );
}
