import { BiSolidLeftTopArrowCircle } from "react-icons/bi"
import StatisticCard from "./StatisticCard"
import SatisticCard from "./StatisticCard"
const statistics = [
  {
    id: 1,
    count: "500+",
    title: "حجز تم بنجاح.",
    desc: "تمت معالجة اكثر من 500 حجز لمستخدمين من مختلف انحاء العالم.",
    image: "/statistics/image-1.png"
  },
  {
    id: 2,
    count: "120+",
    title: "وجهة سياحية.",
    desc: "نغطي أكثر من 120 مدينة ووجهة مميزة حول العالم.",
    image: "/statistics/image-2.png"
  },
  {
    id: 3,
    count: "500+",
    title: "مكان إقامة.",
    desc: "فنادق، شاليهات، شقق، ومزارع مختارة بعناية لتناسب كل الأذواق.",
    image: "/statistics/image-3.png"
  },
  {
    id: 4,
    count: "96%",
    title: "نسبة رضا العملاء.",
    desc: "حسب تقييمات المستخدمين بعد انتهاء الإقامة.",
    image: "/statistics/image-4.png"
  },
  {
    id: 5,
    count: "+02",
    title: "سنوات خبرة.",
    desc: "فريقنا يمتلك خبرة تتجاوز 02 سنوات في قطاع السياحة والتقنية.",
    image: "/statistics/image-5.png"
  },
]

const Satatistics = () => {
  return (
    <section className="my-16 py-16 bg-body rounded-3xl xl:rounded-[6.25rem]">
      <div className="container">
        {/* content */}
        <div className=" w-full flex flex-col xl:flex-row items-center max-xl:gap-4 xl:items-start justify-between ">
          <div className="text-center xl:text-start xl:space-y-4 space-y-2">
            <p className="text-xs font-bold text-main-navy">من نحــــن !.</p>
            <h3 className="text-main-blue xl:text-5xl font-bold md:text-3xl text-xl ">منصة رقمية لحجز الإقامة بسهولة وأمان..</h3>
            <p className="text-main-navy text-xs xl:text-base xl:leading-[3rem]">نحن منصة رقمية حديثة تهدف إلى تبسيط تجربة حجز أماكن الإقامة حول العالم. نؤمن بأن السفر تجربة تبدأ من لحظة اختيار مكان الإقامة،<br className="hidden xl:block" /> نعتمد على صور ومقاطع فيديو حقيقية، وطرق دفع آمنة، وسياسات مرنة، لتضمن حجزك بثقة وراحة بال.</p>
          </div>
          {/* link */}
          <a href="#" className="xl:mt-6 flex items-center gap-2 text-white text-xs bg-main-blue p-2 rounded-full w-fit ">
            خدمـــــــــاتنا
            <BiSolidLeftTopArrowCircle size={20} />
          </a>
        </div>
        {/* statistics */}
        <div className="grid grid-cols-12 gap-2 ">
          {statistics.map((statistic, index) => {
            const isLast = index === statistics.length - 1;


            return (
              <StatisticCard
                key={statistic.id}
                statistic={statistic}
                isLast={isLast}
              />
            );
          })}
        </div>
      </div>
    </section>
  )
}

export default Satatistics
