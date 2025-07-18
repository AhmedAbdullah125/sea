import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { GoArrowUpLeft } from "react-icons/go";
import { TiStarFullOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import AddToFavBtn from "./AddToFavBtn";
import HotelCardCarousel from "./HotelCardCarousel";

const HotelCard = ({ hotel }) => {
  return (
    <Card className="shadow-none border-none space-y-2 " dir="rtl">
      <CardHeader className="p-0">
        {/* img slider */}
        < div className="relative overflow-hidden   rounded-[40px]" >
          {/* sale */}
          <div div className="absolute top-5 start-5 z-10 size-10 bg-main-purple  text-white text-xs font-semibold flex items-center justify-center rounded-[15px]" > {Number(hotel?.discount).toFixed(1)} %</div>
          {/* card image */}
          <HotelCardCarousel images={hotel?.images} />
          {/* add to fav */}
          < AddToFavBtn id={hotel?.id} type="Hotel" postion="absolute top-5 end-5 z-10" />
        </div >
      </CardHeader>
      <CardContent className=" p-0">
        {/* content */}
        < div className="flex flex-col gap-2" >
          {/* rate */}
          <div div className="flex items-start gap-1 " >
            <TiStarFullOutline size={14} className="text-yellow-600" />
            <p className="p-0 m-0 text-xs font-semibold">{parseFloat(hotel?.rating).toFixed(0)} <span className="text-main-gray ">( {hotel?.likes} )</span></p>
          </div >
          {/* details */}
          <h3 h3 className=" font-bold line-clamp-1" > {hotel?.title}</h3 >
          <p className="text-main-gray text-xs line-clamp-1">{hotel?.address}</p>
          {/* price */}
          <h4 className="font-bold text-main-blue h-14">{Number(hotel?.price).toFixed(2)} {hotel?.currencyName} <span className="text-xs font-semibold text-main-purple">/ مقابل {hotel?.rentalPeriod} ليالي</span>
          </h4>
        </div >
      </CardContent>
      <CardFooter className="p-0">
        <Link to={`/hotel?id=${hotel?.id}`} className="size-12 bg-main-navy   !text-white hover:bg-main-purple transition-all duration-300  flex items-center justify-center rounded-full">
          <GoArrowUpLeft size={20} />
        </Link>
      </CardFooter>
    </Card>
  )
}

export default HotelCard



