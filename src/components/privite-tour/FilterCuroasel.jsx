import { useEffect, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"

const hotels = ["/hotels/hotel-2.png", "/hotels/hotel-1.png", "/hotels/hotel-2.png", "/hotels/hotel-3.png", "/hotels/hotel-4.png"]


const FilterCuroasel = () => {
  const [api, setApi] = useState()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

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
          {hotels.map((hotel, index) => (
            <CarouselItem key={index} className="basis-full h-full p-0" >
              < img src={hotel} alt="item" loading="lazy" className="w-full h-full object-cover" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-red-500" />
        <CarouselNext className="bg-red-500" />
      </Carousel>
      {/* Dots Navigation */}
      <div className="absolute bottom-5 w-full flex justify-center gap-1 ">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={`cursor-pointer rounded-full transition-all duration-300 ${index === current ? "bg-white h-1 w-3" : "size-1 bg-white/50"
              }`}
          />
        ))}
      </div>
    </div>
  )
}

export default FilterCuroasel
