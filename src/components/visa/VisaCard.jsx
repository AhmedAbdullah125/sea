import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { TbSquareRoundedCheckFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

const VisaCard = ({item}) => {
  return (
    <Card className="shadow-none border-none  bg-body rounded-[50px] col-span-12 md:col-span-6 xl:col-span-3 p-6">
      <CardHeader className="p-0 " >
        <div className="p-0  flex items-center justify-between">

          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <path d="M35.625 9.6001V16.6808" stroke="#130F26" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M35.625 46.7837V52.7042" stroke="#130F26" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M35.625 38.7839V24.6809" stroke="#130F26" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            <path fillRule="evenodd" clip-rule="evenodd" d="M57.3327 37.4677C50.1575 37.4677 50.1575 26.5297 57.3327 26.5297C57.3327 13.8565 57.3327 9.33325 31.9993 9.33325C6.66602 9.33325 6.66602 13.8565 6.66602 26.5297C13.8413 26.5297 13.8413 37.4677 6.66602 37.4677C6.66602 50.1434 6.66602 54.6666 31.9993 54.6666C57.3327 54.6666 57.3327 50.1434 57.3327 37.4677Z" stroke="#130F26" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <p className="text-3xl font-bold text-main-blue flex items-center gap-3">
            {parseFloat(item?.price).toFixed(2)}
            <svg width="23" height="26" viewBox="0 0 23 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_324_5204)">
                <path d="M14.315 23.0335C13.9045 23.9539 13.6332 24.9528 13.5293 26.0004L22.2148 24.1329C22.6252 23.2127 22.8963 22.2136 23.0005 21.166L14.315 23.0335Z" fill="#016AB5" />
                <path d="M22.2143 18.5379C22.6248 17.6176 22.8961 16.6185 23 15.5709L16.2343 17.0264V14.2285L22.2141 12.9432C22.6246 12.0229 22.8959 11.0238 22.9998 9.97626L16.2341 11.4304V1.36851C15.1973 1.95726 14.2766 2.74095 13.5282 3.66536V12.0124L10.8224 12.5941V0C9.78565 0.588543 8.86495 1.37244 8.11652 2.29685V13.1756L2.06217 14.4768C1.65174 15.3971 1.38024 16.3962 1.2761 17.4438L8.11652 15.9734V19.4968L0.785667 21.0725C0.375238 21.9928 0.103937 22.9919 0 24.0394L7.67335 22.3901C8.298 22.2587 8.83487 21.8852 9.18392 21.3711L10.5912 19.2609V19.2605C10.7372 19.0422 10.8224 18.779 10.8224 18.4955V15.3917L13.5282 14.81V20.4057L22.2141 18.5375L22.2143 18.5379Z" fill="#016AB5" />
              </g>
              <defs>
                <clipPath id="clip0_324_5204">
                  <rect width="23" height="26" fill="white" />
                </clipPath>
              </defs>
            </svg>

          </p>
        </div>



      </CardHeader>
      <CardContent className="p-0 ">
        <h3 className="font-bold text-xl my-8">تأشيــرة {item?.period} يومــاً</h3>
        <ul className="space-y-4">
          {item?.elements.map((element, i) => (
            
          <li key={i} className="flex items-center gap-2">
            <TbSquareRoundedCheckFilled className="text-main-blue" />
            <p className="text-sm font-semibold">
              {element}
            </p>
          </li>
          ))}

        </ul>
      </CardContent>
      <CardFooter className="p-0 mt-8">
        <Link to="/gate" className="w-fit px-12 py-3 m-auto  bg-main-purple  !text-white  text-xs font-semibold flex items-center justify-center rounded-full hover:bg-main-blue transation-all duration-300">
          قدم طلبك الآن
        </Link>
      </CardFooter>
    </Card>
  )
}

export default VisaCard
