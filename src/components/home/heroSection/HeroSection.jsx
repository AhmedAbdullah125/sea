import MainHeader from "../../header/MainHeader";
import FilterTabs from "../filterTabs/FilterTabs";
import styles from "./heroSection.module.css";
import Loading from "../../loading/Loading";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import { useGetSettings } from '@/components/global/useGetSettings';
const HeroSection = () => {
  const { data, isLoading } = useGetSettings();
  return (
    <>
      {
        isLoading ? <Loading /> :
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="min-h-[80vh] bg-[url('/app/hero.png')] bg-cover bg-center bg-no-repeat space-y-6 pb-6 flex flex-col relative lg:justify-end justify-between lg:pt-[210px]">
            <MainHeader />
            {/* Flying Airplane Animation */}
            {/* <motion.div
              initial={{ y: "0vh", x: -50, rotate: 0, rotateY: 0, scale: 1, opacity: 0 }}
              animate={{
                y: "-100vh",
                x: [0, 50, 0, -1000, 0],
                rotate: [0, 15, -10, 20, -15, 0, 15, -10, 0],
                rotateY: [0, 180, 360, 180, 0],
                scale: [1, 1.2, 0.9, 1.3, 1, 1.1, 1],
                opacity: [0, 1, 1, 1, 1, 1, 0]
              }}
              transition={{
                y: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                },
                x: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotateY: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                scale: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                opacity: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="absolute right-[10%] lg:right-[15%] w-24 h-auto lg:w-32 z-10 pointer-events-none"
            >
              <img
                src={swaplane}
                alt="Flying plane"
                className="w-full h-auto object-contain"
              />
            </motion.div> */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="  flex items-end justify-center ">
              <div className="container text-white space-y-6 ">
                {/* content */}
                <div className="w-full flex flex-col xl:flex-row justify-between items-end ">
                  {/* title */}
                  <div className=" xl:max-w-[45rem] me-auto  space-y-4">
                    <h1 className={`${styles.title} text-4xl md:text-5xl xl:text-6xl font-semibold`} >
                      رحلتك تبدأ من هنـــــا..
                      <br />
                      {/* احجــز بثقة. */}
                      {/* <MorphingText texts={texts} loop  /> */}
                      <div>
                        <ReactTyped strings={[" احجــز بثقة ..", "  احـجــز بموثوقــية ..", " احجــز بأمــان ..",]} loop typeSpeed={100} />
                        <br />
                      </div>
                    </h1>
                    <p className="text-lg font-light xl:max-w-[80%] ">
                      سي لإدارة الوجهات السياحية <br />
                      ريادة عربية في السياحة الذكية وخدمات السفر المتكاملة
                                          </p>
                  </div>
                  {/* counters */}
                  <div className="hidden xl:flex flex-col  justify-center items-center gap-10 pe-0 md:pe-24">
                    <div >
                      <h2 className="text-5xl font-bold text-white">
                        <NumberTicker value={data?.compleated_bookings} className="text-5xl font-bold text-white" /> +</h2>
                      <p >فــندق مبــاشر </p>
                    </div>
                    <div>
                      <h2 className="text-5xl font-bold "><NumberTicker value={data?.happy_customers} className="text-5xl font-bold text-white" /> + </h2>
                      <p >عميــل سعيد!</p>
                    </div>
                  </div>
                </div>
                {/* filter  */}
                <FilterTabs data={data} />
              </div>
            </motion.div>

          </motion.section>
      }
    </>
  )
}
export default HeroSection