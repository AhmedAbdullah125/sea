import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import HotelCard from './HotelCard'
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { fetchFromApi } from "../../../api/utils/fetchData";
import Loader from "../../loader/Loader"
import AlertError from "../../alerts/AlertError"
import AlertWarning from "../../alerts/AlertWarning"
const HotelsSection = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['hotels'],
    queryFn: async () => {
      const res = await fetchFromApi("/hotels-user");
      return res;
    }
  })
  if (isLoading) return <Loader />
  if (isError) return <div className="container my-12"><AlertError>
    هناك خطاء ما
  </AlertError></div>

  return (

    <section className='my-16 '>
      {data?.data?.data?.length > 0 ?
        <Carousel
          dir="rtl"
          opts={{
            align: "end",
            loop: true,
          }}
          className="w-full space-y-8  "
        >
          <div className='container flex items-center justify-between'>
            <h2 className='xl:text-3xl md:text-2xl text-xl  font-bold text-main-blue '>أشهــر فنــــادق تركيـــــا.</h2>
            <div className='flex gap-2 items-center '>
              <CarouselPrevious className="border-none bg-[#F2F2F2]  text-main-gray hover:bg-main-blue hover:text-white   static xl:size-10  size-8 -translate-y-0" icon={<MdArrowForwardIos />} />
              <CarouselNext className="border-none bg-[#F2F2F2]  text-main-gray hover:bg-main-blue hover:text-white  static xl:size-10  size-8 -translate-y-0 " icon={<MdArrowBackIos />} />
            </div>
          </div>
          <div className="max-xl:container xl:ps-20 2xl:ps-24">

            <CarouselContent  >
              {data?.data?.data?.map((hotel, index) => (
                <CarouselItem key={index} className="md:basis-1/3 xl:basis-1/6 ">
                  <HotelCard hotel={hotel} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>

        </Carousel>
        :
        <div className="container">
          <AlertWarning>لا يوجد فنادق متاحه الان</AlertWarning>
        </div>
      }



    </section>
  )
}

export default HotelsSection
