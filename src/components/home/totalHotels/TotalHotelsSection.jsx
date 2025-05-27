import TotalHotelCard from "./TotalHotelCard"
import { BiSolidLeftTopArrowCircle } from "react-icons/bi";

const TotalHotelsSection = () => {
  return (
    <section className="my-16 xl:my-24 container  xl:space-y-12 space-y-8">
      {/* title */}
      <div className="flex flex-col xl:flex-row items-center justify-between max-xl:space-y-8">
        <div className="text-center xl:text-start">
          <h2 className='xl:text-3xl md:text-2xl text-xl  font-bold text-main-blue '>أشهر الفنادق حول العالم !.</h2>
          <p className="text-xs font-light text-main-navy mt-4">تتوزع أشهر الفنادق عالميًا لتمنحك تجارب إقامة لا تُنسى. تتميز هذه الفنادق بالفخامة، الخدمة الراقية...</p>
        </div>
        <p className="text-sm font-bold text-main-navy text-center xl:text-start">+250 فندق حــــول العالم</p>
      </div>

      {/* grid */}
      <div className='grid grid-cols-12 xl:gap-x-4 xl:gap-y-10 gap-4'>
        {Array.from({ length: 8 }).map((_, index) => (<TotalHotelCard key={index} />))}
        <div className="col-span-12">
          <button className="flex items-center gap-4 text-white text-sm bg-main-purple p-4  border-2 border-main-purple hover:bg-white hover:text-main-purple rounded-full m-auto">
            عرض المزيد
            <BiSolidLeftTopArrowCircle size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default TotalHotelsSection
