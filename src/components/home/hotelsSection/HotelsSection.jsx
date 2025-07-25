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
import { motion } from "framer-motion";
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

    <motion.section
      className='my-16'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {data?.data?.data?.length > 0 ?
        <Carousel
          opts={{
            loop: true,
            direction: "rtl",
            align: "center",

          }}
          className="w-full space-y-8  "
        >
          <div className=' flex items-center justify-between xl:ps-20 2xl:ps-24'>
            <h2 className='xl:text-3xl md:text-2xl text-xl  font-bold text-main-blue  '>أشهــر فنــــادق {localStorage.getItem('userCountry') || 'تركيـــــا'}.</h2>
            <div className='flex gap-2 items-center '>
              <CarouselPrevious className="border-none bg-[#F2F2F2]  text-main-gray hover:bg-main-blue hover:text-white   static xl:size-10  size-8 -translate-y-0" icon={<MdArrowForwardIos />} />
              <CarouselNext className="border-none bg-[#F2F2F2]  text-main-gray hover:bg-main-blue hover:text-white  static xl:size-10  size-8 -translate-y-0 " icon={<MdArrowBackIos />} />
            </div>
          </div>
          <div className="max-xl:container xl:ps-20 2xl:ps-24">

            <CarouselContent className=""  >
              {data?.data?.data?.map((hotel, index) => (
                <CarouselItem key={index} className="md:basis-1/3 xl:basis-1/5 ">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <HotelCard hotel={hotel} />
                  </motion.div>
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



    </motion.section>
  )
}

export default HotelsSection
