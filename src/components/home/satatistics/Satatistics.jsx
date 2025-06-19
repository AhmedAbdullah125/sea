import { useQuery } from "@tanstack/react-query"
import { BiSolidLeftTopArrowCircle } from "react-icons/bi"
import { fetchFromApi } from "../../../api/utils/fetchData"
import StatisticCard from "./StatisticCard"
import Loader from "../../loader/Loader"
import AlertError from "../../alerts/AlertError"

const Satatistics = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['about-us'],
    queryFn: async () => {
      const res = await fetchFromApi("/about-us");
      return res;
    }
  })
  if (isLoading) return <Loader />
  if (isError) return <div className="container my-12">
    <AlertError>
      هناك خطاء ما
    </AlertError>
  </div>
  return (
    <section className="my-16 py-16 bg-body rounded-3xl xl:rounded-[6.25rem]">
      {data?.data?.data?.images?.length > 0 ?
        <div className="container">
          {/* content */}
          <div className=" w-full flex flex-col xl:flex-row items-center max-xl:gap-4 xl:items-start justify-between ">
            <div className="text-center xl:text-start xl:space-y-4 space-y-2">
              <p className="text-xs font-bold text-main-navy" dangerouslySetInnerHTML={{ __html: data?.data?.data?.title }}></p>
              <h3 className="text-main-blue xl:text-5xl font-bold md:text-3xl text-xl " dangerouslySetInnerHTML={{ __html: data?.data?.data?.mainTitle }}></h3>
              <div className="text-main-navy text-xs xl:text-base xl:leading-[3rem]">
                <div dangerouslySetInnerHTML={{ __html: data?.data?.data?.mainDescription }} />
                <div dangerouslySetInnerHTML={{ __html: data?.data?.data?.secondDescription }} />
              </div>
            </div>
            {/* link */}
            <a href="#" className="xl:mt-6 flex items-center gap-2 text-white text-xs bg-main-blue p-2 border-2 border-main-blue hover:bg-transparent hover:text-main-blue rounded-full w-fit ">
              خدمـــــــــاتنا
              <BiSolidLeftTopArrowCircle size={20} />
            </a>
          </div>
          {/* statistics */}
          <div className="grid grid-cols-12 gap-2 ">
            {data?.data?.data?.images?.map((statistic, index) => {
              const isLast = index === data?.data?.data?.images?.length - 1;
              return (
                <StatisticCard
                  key={index}
                  idx={index + 1}
                  statistic={statistic}
                  isLast={isLast}
                />
              );
            })}
          </div>
        </div> : ""}
    </section>
  )
}

export default Satatistics
