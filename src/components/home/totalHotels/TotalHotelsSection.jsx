import { useQuery } from "@tanstack/react-query";
import TotalHotelCard from "./TotalHotelCard"
import { BiSolidLeftTopArrowCircle } from "react-icons/bi";
import { fetchFromApi } from "../../../api/utils/fetchData";
import { Link } from "react-router-dom";
import Loader from "../../loader/Loader";
import AlertError from "../../alerts/AlertError";
import AlertWarning from "../../alerts/AlertWarning";

const TotalHotelsSection = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['hotels'],
    queryFn: async () => {
      const res = await fetchFromApi("/hotels");
      return res;
    }
  })
  if (isLoading) return <Loader />
  if (isError) return <div className="container my-12"><AlertError>
    هناك خطاء ما
  </AlertError></div>
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
      {data?.data?.data?.length > 0 ?
        <div className='grid grid-cols-12 xl:gap-x-4 xl:gap-y-10 gap-4'>
          {data?.data?.data?.map((hotel, index) => (<TotalHotelCard key={index} hotel={hotel} />))}
          <div className="col-span-12">
            <Link to="/hotels" className="w-fit flex items-center gap-4 !text-white text-sm bg-main-purple p-4   hover:bg-main-blue transation-all duration-300  rounded-full m-auto">
              عرض المزيد
              <BiSolidLeftTopArrowCircle size={20} />
            </Link>
          </div>
        </div>
        :
        <AlertWarning>لا يوجد فنادق متاحه الان</AlertWarning>
      }
    </section>
  )
}

export default TotalHotelsSection
