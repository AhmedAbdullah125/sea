

const SatisticCard = ({ statistic, isLast }) => {
  return (
    <div
      className={`h-[450px] rounded-[105px] bg-red-500 bg-no-repeat bg-center bg-cover ${isLast ? 'xl:col-span-8 col-span-12' : 'xl:col-span-4 md:col-span-6 col-span-12'
        }`}
      style={{ backgroundImage: `url(${statistic.image})` }}
    >
      <div className="w-full h-full xl:p-12 p-10 flex flex-col justify-between">
        <img
          src={`/statistics/icon-${statistic.id}.svg`}
          alt="icon"
          width={55}
          height={55}
          className="ms-auto"
        />
        <div className="text-white">
          <p className="text-6xl font-bold">{statistic.count}</p>
          <div className="space-y-2">
            <p className="font-semibold">{statistic.title}</p>
            <p className="text-xs font-light">{statistic.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatisticCard
