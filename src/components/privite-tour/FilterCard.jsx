import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { IoLogoWhatsapp } from "react-icons/io";
import { TiStarFullOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import FilterCuroasel from "./FilterCuroasel";

const ryial = <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_324_2525)">
    <path d="M9.33563 15.9459C9.06796 16.5832 8.89103 17.2747 8.82324 18L14.4877 16.7071C14.7554 16.07 14.9322 15.3783 15.0001 14.6531L9.33563 15.9459Z" fill="#A71755" />
    <path d="M14.4876 12.8339C14.7553 12.1968 14.9322 11.5051 15 10.7799L10.5876 11.7875V9.85051L14.4875 8.96067C14.7551 8.32356 14.9321 7.63187 14.9999 6.90665L10.5874 7.91339V0.947429C9.91131 1.35503 9.31085 1.89758 8.82274 2.53756V8.31626L7.05806 8.71898V0C6.38195 0.407453 5.78149 0.950151 5.29338 1.59013V9.12156L1.34489 10.0224C1.07722 10.6595 0.900155 11.3512 0.832236 12.0765L5.29338 11.0585V13.4978L0.512392 14.5887C0.24472 15.2258 0.0677852 15.9175 0 16.6427L5.00436 15.5008C5.41174 15.4099 5.76187 15.1513 5.98951 14.7954L6.90728 13.3345V13.3342C7.00255 13.1831 7.05806 13.0008 7.05806 12.8045V10.6558L8.82274 10.2531V14.127L14.4875 12.8336L14.4876 12.8339Z" fill="#A71755" />
  </g>
  <defs>
    <clipPath id="clip0_324_2525">
      <rect width="15" height="18" fill="white" />
    </clipPath>
  </defs>
</svg>


const FilterCard = () => {
  return (
    <Card className="shadow-none border-none space-y-4 xl:col-span-3 md:col-span-6 col-span-12" dir="rtl">
      <CardHeader className="p-0">
        {/* img slider */}
        < div className="relative overflow-hidden   rounded-[40px]" >
          {/* sale */}
          <div div className="absolute top-5 end-5 z-10 px-8 py-3 bg-white/15 backdrop-blur-sm text-white text-[10px] font-semibold flex items-center justify-center rounded-full" > كيلومترات غير محدودة</div>
          {/* card image */}
          <FilterCuroasel />

        </div >
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-0">
        {/* content */}
        < div className="flex flex-col gap-3" >
          {/* rate */}
          <div className="flex items-start gap-1 w-fit bg-main-navy text-white py-3 px-4 rounded-full" >
            <TiStarFullOutline size={14} className="text-yellow-500" />
            <p className="p-0 m-0 text-[10px] font-semibold">5.0 ( 500+ )</p>
          </div >
          {/* details */}
          <h3 h3 className="text-4xl font-bold line-clamp-1" >Atlas 5 Auto</h3 >
          {/* price */}
          <div className="flex items-center justify-between" >
            <h4 className="text-xl font-bold text-main-blue flex items-center gap-2">692.000
              {ryial}
            </h4>
            <div className="h-8 w-10 bg-main-purple text-white text-[10px] font-semibold flex items-center justify-center rounded-full">
              20%
            </div>
          </div>
        </div >
      </CardContent>
      <CardFooter className="p-0">
        <Link to="/" className="h-12 w-full bg-main-blue  border-2 border-main-blue text-white hover:bg-white hover:text-main-blue  flex items-center justify-between rounded-full px-4">
          <p className="text-[10px] font-semibold">أحجز الآن</p>
          <IoLogoWhatsapp size={20} />
        </Link>
      </CardFooter>
    </Card>
  )
}

export default FilterCard
