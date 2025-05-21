import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { GoArrowUpLeft } from "react-icons/go";
import { TiStarFullOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import AddToFavBtn from "./AddToFavBtn";
import HotelCardCarousel from "./HotelCardCarousel";

const HotelCard = () => {
  return (
    <Card className="shadow-none border-none space-y-3" dir="rtl">
      <CardHeader className="p-0">
        {/* img slider */}
        < div className="relative overflow-hidden   rounded-[40px]" >
          {/* sale */}
          <div div className="absolute top-5 start-5 z-10 size-10 bg-main-purple  text-white text-xs font-semibold flex items-center justify-center rounded-[15px]" > 30 %</div>
          {/* card image */}
          <HotelCardCarousel  />
          {/* add to fav */}
          < AddToFavBtn postion="absolute top-5 end-5 z-10" />
        </div >
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-0">
        {/* content */}
        < div className="flex flex-col gap-3" >
          {/* rate */}
          <div div className="flex items-start gap-1 " >
            <TiStarFullOutline size={14} className="text-yellow-600" />
            <p className="p-0 m-0 text-xs font-semibold">5.0 <span className="text-main-gray ">( 500+ )</span></p>
          </div >
          {/* details */}
          <h3 h3 className=" font-bold line-clamp-1" > قصر تشراغان كمبنسكي إسطنبول</h3 >
          <p className="text-main-gray text-xs line-clamp-1">3284 طريق الوطني إسطنبــول، تركيـــا...</p>
          {/* price */}
          <h4 className="font-bold text-main-blue">TRY 66.946 <span className="text-xs font-semibold text-main-purple">/ مقابل 5 ليالٍ</span>
          </h4>
        </div >
      </CardContent>
      <CardFooter className="p-0">
        <Link to="/" className="size-12 bg-main-navy  border-2 border-main-navy text-white hover:bg-white  flex items-center justify-center rounded-full">
          <GoArrowUpLeft size={20} />
        </Link>
      </CardFooter>
    </Card>
  )
}

export default HotelCard



