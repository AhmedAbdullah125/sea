import { useEffect, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md"

const hotels = ["/hotels/hotel-2.png", "/hotels/hotel-1.png", "/hotels/hotel-2.png", "/hotels/hotel-3.png", "/hotels/hotel-4.png"]


const FilterCuroasel = ({ images }) => {
  const [api, setApi] = useState()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log({ images });

  }, [])
  useEffect(() => {
    if (!api) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  return (
    <div className="relative">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent className=" h-60 " dir="ltr">
          {images?.map((tour, index) => (
            <CarouselItem key={index} className="basis-full h-full p-0" >
              < img src={tour} alt="item" loading="lazy" className="w-full h-full object-cover" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="  flex items-start justify-between px-4 absolute w-full bottom-3">
          <CarouselNext className="bg-white/15 backdrop-blur-md !text-white  size-8 static flex items-center justify-center rounded-full  " icon={<MdArrowForwardIos className="w-2 h-2" />} />
          {/* Dots Navigation */}
          <div className=" flex justify-center gap-1 ">
            {Array.from({ length: count }).map((_, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-full transition-all duration-300 ${index === current ? "bg-white h-1 w-3" : "size-1 bg-white/50"
                  }`}
              />
            ))}
          </div>
          <CarouselPrevious className="bg-white/15 backdrop-blur-md !text-white  size-8 static flex items-center justify-center rounded-full  " icon={<MdArrowBackIos className="w-2 h-2" />} />
        </div>
      </Carousel>
 
    </div>
  )
}

export default FilterCuroasel
