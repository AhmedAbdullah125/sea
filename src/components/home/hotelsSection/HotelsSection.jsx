import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel"
import HotelCard from './HotelCard'
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { fetchFromApi } from "../../../api/utils/fetchData";
import Loader from "../../loader/Loader"
import AlertError from "../../alerts/AlertError"
import AlertWarning from "../../alerts/AlertWarning"
import { motion } from "framer-motion";
import { useGetSettings } from '@/components/global/useGetSettings';


const HotelsSection = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['hotels'],
    queryFn: async () => {
      const res = await fetchFromApi("/filter-hotels?countery_id=1&page=1&type=hotel");
      return res;
    }
  })
  const { data: settings, isLoading: settingsLoading } = useGetSettings();

  
  if (isLoading || settingsLoading) return <Loader />
  if (isError) return <div className="container my-12"><AlertError>
    هناك خطاء ما
  </AlertError></div>
  

  return (

    <motion.section
      className='my-16 relative container'
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
          <div className=' flex items-center justify-between gap-2'>
            <h2 className='xl:text-3xl md:text-2xl text-xl  font-bold text-main-blue  '> فنــــادق تركيـــــا بتوصــية ســـي</h2>
            <div className='flex gap-2 items-center justify-between w-[120px] '>
              <CarouselPrevious className="flex items-center justify-center rounded-full transition-all duration-300 ease-in-out text-white w-11 h-11 text-[10px] bg-[rgba(0,0,0,0.25)] shadow-[0_0_1px_1px_rgba(255,255,255,0.25)] backdrop-blur-[10px] relative top-[unset] bottom-[unset] left-[unset] right-[unset] translate-x-0 translate-y-0" icon={<MdArrowForwardIos />} />
              <CarouselNext className="flex items-center justify-center rounded-full transition-all duration-300 ease-in-out text-white w-11 h-11 text-[10px] bg-[rgba(0,0,0,0.25)] shadow-[0_0_1px_1px_rgba(255,255,255,0.25)] backdrop-blur-[10px] relative top-[unset] bottom-[unset] left-[unset] right-[unset] translate-x-0 translate-y-0" icon={<MdArrowBackIos />} />
            </div>
          </div>
          <div className="max-xl:container">

            <CarouselContent className=""  >
              {data?.data?.data?.map((hotel, index) => (
                <CarouselItem key={index} className="md:basis-1/3 xl:basis-1/5 ">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <HotelCard hotel={hotel} data= {settings} />
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
