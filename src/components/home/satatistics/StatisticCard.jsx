import { NumberTicker } from "@/components/magicui/number-ticker";
const SatisticCard = ({ statistic }) => {
  return (
      <div className={`overflow-hidden h-[300px] rounded-[105px] bg-white`} >
        <div className="w-full h-full xl:p-12 p-10 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <NumberTicker value={statistic.number} className="text-6xl text-main-navy font-bold after:content-['+']" />
            <img src={statistic.image} alt="" className='w-16 h-16 object-contain rounded-2xl' />
          </div>
          <div className="space-y-2">
            <p className="font-semibold">{statistic.title}</p>
            <p className="text-xs font-light">{statistic.description}</p>
          </div>
        </div>
      </div>
  )
}
export default SatisticCard