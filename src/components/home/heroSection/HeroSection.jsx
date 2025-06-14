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
    <section className="min-h-[110vh] bg-[url('/home/hero.png')] bg-cover bg-center bg-no-repeat flex items-end justify-center pb-6 pt-20">
      <div className="container text-white space-y-8 ">
        {/* content */}
        <div className="w-full flex flex-col xl:flex-row justify-between items-end "> 
          {/* title */}
          <div className=" xl:max-w-[45rem] me-auto  space-y-6">
            <h1 className={`${styles.title} text-4xl md:text-5xl xl:text-6xl font-semibold`} >
              رحلتك تبدأ من هنـــــا...
              إحجــز بثقة.
            </h1>
            <p className="xl:text-lg font-light">
              منصة إلكترونية أوفلاين معتمدة للحجوزات الفندقية و الباقات السياحية
              حول العالم والتواصل المباشر مع العملاء .
            </p>
          </div>
          {/* counters */}
          <div className="hidden xl:flex flex-col  justify-center items-center gap-10 ">
            {counters.map((counter, index) => (
              <div key={index}>
                <h2 className="text-6xl font-bold ">{counter.number}+</h2>
                <p className="text-lg ">{counter.title}</p>
              </div>
            ))}

          </div>
        </div>
        {/* filter  */}
        <FilterTabs/>

      </div>
    </section>
  )
}

export default HeroSection
