import MainHeader from "../../header/MainHeader";
import FilterTabs from "../filterTabs/FilterTabs";
import styles from "./heroSection.module.css";
const counters = [
  {
    number: "10k",
    title: "حجـــــز مكتمل",
  },
  {
    number: "47k",
    title: "عميــل سعيد!",
  },
];
const HeroSection = () => {
  return (
    <section className="min-h-[100vh] bg-[url('/home/hero.png')] bg-cover bg-center bg-no-repeat space-y-6 pb-6">
      <MainHeader />
      <div className="  flex items-end justify-center ">
      <div className="container text-white space-y-6 ">
        {/* content */}
        <div className="w-full flex flex-col xl:flex-row justify-between items-end "> 
          {/* title */}
          <div className=" xl:max-w-[45rem] me-auto  space-y-4">
            <h1 className={`${styles.title} text-4xl md:text-5xl xl:text-6xl font-semibold`} >
              رحلتك تبدأ من هنـــــا...
              إحجــز بثقة.
            </h1>
            <p className="text-sm font-light xl:max-w-[70%] ">
              منصة إلكترونية أوفلاين معتمدة للحجوزات الفندقية و الباقات السياحية
              حول العالم والتواصل المباشر مع العملاء .
            </p>
          </div>
          {/* counters */}
          <div className="hidden xl:flex flex-col  justify-center items-center gap-10 ">
            {counters.map((counter, index) => (
              <div key={index}>
                <h2 className="text-5xl font-bold ">{counter.number}+</h2>
                <p >{counter.title}</p>
              </div>
            ))}

          </div>
        </div>
        {/* filter  */}
        <FilterTabs/>

      </div>
      </div>

    </section>
  )
}

export default HeroSection
