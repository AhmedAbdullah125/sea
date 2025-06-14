import { IoIosArrowBack } from "react-icons/io";
import { PiSealCheckFill, PiWarningOctagonFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { conditions } from "../../data/transport";



const logo = <svg width="58" height="59" viewBox="0 0 58 59" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect y="0.5" width="58" height="58" rx="29" fill="#F4F4F4" />
  <path fillRule="evenodd" clip-rule="evenodd" d="M30.1173 26.7205C33.9452 25.0013 38.4959 26.5961 40.2814 30.2827C42.0669 33.9686 40.4106 38.3509 36.582 40.0694C32.7541 41.7887 17.0006 40.7356 17.0006 40.7356C17.0006 40.7356 26.2895 28.439 30.1173 26.7197V26.7205Z" fill="#6D7172" />
  <path fillRule="evenodd" clip-rule="evenodd" d="M27.8827 32.2794C24.0548 33.9986 19.5041 32.4038 17.7186 28.7171C15.9332 25.0313 17.5894 20.6489 21.4181 18.9305C25.2459 17.2112 40.9994 18.2643 40.9994 18.2643C40.9994 18.2643 31.7106 30.5609 27.8827 32.2801V32.2794Z" fill="url(#paint0_linear_243_2190)" />
  <path fillRule="evenodd" clip-rule="evenodd" d="M30.1173 26.7205C33.9452 25.0013 38.4959 26.5961 40.2814 30.2827C42.0669 33.9686 40.4106 38.3509 36.582 40.0694C32.7541 41.7887 17.0006 40.7356 17.0006 40.7356C17.0006 40.7356 26.2895 28.439 30.1173 26.7197V26.7205Z" fill="url(#paint1_linear_243_2190)" />
  <defs>
    <linearGradient id="paint0_linear_243_2190" x1="16.9998" y1="25.4581" x2="40.9994" y2="25.4581" gradientUnits="userSpaceOnUse">
      <stop stop-color="#016AB5" />
      <stop offset="0.27" stop-color="#016AB5" />
      <stop offset="0.65" stop-color="#174474" />
      <stop offset="1" stop-color="#174474" />
    </linearGradient>
    <linearGradient id="paint1_linear_243_2190" x1="16.9998" y1="33.5418" x2="40.9994" y2="33.5418" gradientUnits="userSpaceOnUse">
      <stop stop-color="#A71755" />
      <stop offset="0.35" stop-color="#A71755" />
      <stop offset="0.61" stop-color="#6F0635" />
      <stop offset="1" stop-color="#0D1214" />
    </linearGradient>
  </defs>
</svg>


// Step1.jsx
const Step1 = ({ nextStep }) => {
  return (
    <div className="space-y-6">
      {/* sea */}
      <Link to={"/"} className="flex items-center justify-between w-full bg-white  px-3 py-2 rounded-full">
        {/* content */}
        <div className="flex items-center gap-2">
          {logo}
          <div>
            <h3 className="text-main-navy font-bold flex items-start gap-1 max-md:text-xs">
              ضمــــــــان سي / SEA.
              <PiSealCheckFill />
            </h3>
            <p className="text-main-gray text-xs mt-1">نضمن لك صحة المعلومات ونظافة المكان</p>
          </div>
        </div>
        {/* arrow */}
        <div className="shrink-0 size-6 text-white bg-main-navy border border-main-navy hover:bg-transparent hover:text-main-navy rounded-full flex items-center justify-center transition-all duration-200">
          <IoIosArrowBack size={14} />
        </div>
      </Link>
      {/* conditions */}
      <div className=" space-y-4">
        {/* title */}
        <p className="text-main-navy font-bold flex items-center gap-1">
          <PiWarningOctagonFill />
          تنبيــــه !.
        </p>
        {/* cards */}
        <div className="grid grid-cols-12 gap-2  ">
          {conditions.map((item, index) => (
            <div key={index} className=" xl:col-span-3 md:col-span-6 col-span-12   px-6 py-10 flex flex-col justify-between items-center bg-white rounded-[50px] shadow">
              {item.icon}
              <p className="text-xs font-semibold text-main-navy text-center mt-6">
                {item.lable}
              </p>
            </div>
          ))}
        </div>

      </div>
      {/* points */}
      <div className=" space-y-4">
        {/* title */}
        <p className="text-main-navy font-bold flex items-center gap-1">
          <PiWarningOctagonFill />
          نقطة الالتقـــاء والانطلاق !.
        </p>
        {/* points details */}
        <div className="text-xs font-semibold space-y-2">
          <h3 className="text-sm text-main-blue font-bold">
            عنــد الاستقبــال عند المطار !
          </h3>
          <p className="text-main-gray">
            مطار إسطنبـــول : التواجد عند البــوابة 14
          </p>
          <p className="text-main-gray">
            مطار صبيــحة : التواجد عند البــوابة 09
          </p>
        </div>
        <div className="text-xs font-semibold space-y-2">
          <h3 className="text-sm text-main-blue font-bold">
            عنــد التوديــع عند المطار !
          </h3>
          <p className="text-main-gray">
            التواجــد بمنطقة اللوبي او المكان المتفق له تماما من قبل العميــل
          </p>
        </div>
      </div>
      {/* next step */}
      <button
        onClick={nextStep}
        className="block xl:w-fit w-full text-xs font-semibold px-12 py-2 bg-main-purple border-2 border-main-purple hover:bg-transparent hover:text-main-purple text-white rounded-full"
      >
        أحجـــز الان
      </button>
    </div>
  );
};

export default Step1;
