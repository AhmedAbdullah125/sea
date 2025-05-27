import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import HotelCard from './HotelCard'
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const HotelsSection = () => {
  return (
    <section className='my-16 '>
      <Carousel
        opts={{
          align: "start",
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

          <CarouselContent dir="ltr" >
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/3 xl:basis-1/6 ">
                <HotelCard />
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>

      </Carousel>



    </section>
  )
}

export default HotelsSection
