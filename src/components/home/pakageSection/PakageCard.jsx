import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card"
import AddToFavBtn from "../hotelsSection/AddToFavBtn"
import { TiStarFullOutline } from "react-icons/ti"

const PakageCard = ({imgSrc="/pakages/pakage-1.png"}) => {
  return (
    <Card className="shadow-none border-none col-span-12 md:col-span-6 xl:col-span-3 space-y-6">
      <CardHeader className="p-0 ">
        <div className=" relative overflow-hidden h-64 rounded-[40px]">
          {/* add to fav */}
          < AddToFavBtn postion="absolute top-5 end-5 z-10" />
          < img src={imgSrc} alt="item" loading="lazy" className="w-full h-full object-cover" />
        </div>
      </CardHeader>
      <CardContent className="p-0 space-y-3">
        {/* rate and duration */}
        <div className="flex items-center justify-between">
          {/* duration */}
          <p className="text-xs font-semibold text-main-gray">جولة لمدة 06 أيــــام</p>
          {/* rate */}
          <div div className="flex items-start gap-1 " >
            <TiStarFullOutline size={14} className="text-yellow-600" />
            <p className="p-0 m-0 text-xs font-semibold">5.0 <span className="text-main-gray ">( 500+ )</span></p>
          </div >
        </div>
        {/* details */}
        <h3 h3 className=" font-bold line-clamp-1" > مدريــــــد - برشلـــونة</h3 >
        <p className="text-main-gray text-xs line-clamp-1">سارية في 22 نوفمبر 2025</p>
        {/* price */}
        <h4 className="font-bold text-main-blue">EUR 999 <span className="text-xs font-semibold text-main-purple">/ للشخص الواحد</span>
        </h4>


      </CardContent>
      <CardFooter className="p-0">
        <div className="flex items-center justify-between gap-2 w-full">
          <button className="h-12 flex-grow  rounded-full   bg-main-purple text-white text-xs font-semibold ">إحجـــز رحلتك الان</button>
          <button className="size-12 bg-main-purple rounded-full flex items-center justify-center">
            <img src="/pakages/plane.svg" alt="icon" loading="lazy" />
          </button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default PakageCard
