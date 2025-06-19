

const SatisticCard = ({ statistic,idx, isLast }) => {
  return (
    <div
      className={`overflow-hidden h-[350px] rounded-[105px] bg-red-500 bg-no-repeat bg-center bg-cover ${isLast ? ' col-span-12' : 'xl:col-span-4 md:col-span-6 col-span-12'
        }`}
      style={{ backgroundImage: `url(${statistic.image})` }}
    >
      <div className="w-full h-full xl:p-12 p-10 flex flex-col justify-between bg-black/50">
        <img
          src={`/statistics/icon-${idx}.svg`}
          alt="icon"
          width={55}
          height={55}
          className="ms-auto"
        />
        <div className="text-white">
          <p className="text-6xl font-bold">{statistic.number}</p>
          <div className="space-y-2">
            <p className="font-semibold">{statistic.title}</p>
            <p className="text-xs font-light">{statistic.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatisticCard
