import { useQuery } from "@tanstack/react-query"
import { BiSolidLeftTopArrowCircle } from "react-icons/bi"
import { fetchFromApi } from "../../../api/utils/fetchData"
import StatisticCard from "./StatisticCard"
import Loader from "../../loader/Loader"
import AlertError from "../../alerts/AlertError"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { decode } from "html-entities"
const Satatistics = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['about-us'],
    queryFn: async () => {
      const res = await fetchFromApi("/about-us");
      return res;
    }
  })
  if (isLoading) return <Loader />
  if (isError) return <div className="container my-12">
    <AlertError>
      هناك خطاء ما
    </AlertError>
  </div>
    function doubleDecode(text) {
      if (!text) return ''
      return decode(decode(text))
    }
  return (
    <motion.section
    initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="my-16 py-16 bg-body rounded-3xl xl:rounded-[6.25rem]">
      {data?.data?.data?.images?.length > 0 ?
        <div className="container">
          {/* content */}
          <div className=" w-full flex flex-col xl:flex-row items-center max-xl:gap-4 xl:items-start justify-between mb-6">
            <div className="text-center xl:text-start xl:space-y-4 space-y-2">
              <motion.p
              initial={{ opacity: 0, y: -30,x:-30 }}
                whileInView={{
                  opacity: 1, y: 0, x: 0
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, }}
                className=" font-bold text-main-navy" >من نحــــن !.</motion.p>
              <motion.h3
                initial={{ opacity: 0, y: -30, x: -30 }}
                whileInView={{
                  opacity: 1, y: 0, x: 0
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-main-blue xl:text-3xl font-bold md:text-2xl text-xl " dangerouslySetInnerHTML={{ __html:doubleDecode( data?.data?.data?.description) }}></motion.h3>
              <motion.div
                initial={{ opacity: 0, y: -30, x: -30 }}
                whileInView={{
                  opacity: 1, y: 0, x: 0
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.5,delay:0.4 }}
                className="text-main-navy  xl:text-base ">
                <div dangerouslySetInnerHTML={{ __html: doubleDecode(data?.data?.data?.title)}} />
              </motion.div>
            </div>
            {/* link */}
            <Link to="/table" className="xl:mt-6 flex items-center gap-2 text-white text-xs bg-main-blue p-2 border-2 border-main-blue hover:bg-transparent hover:text-main-blue rounded-full w-fit ">
              خدمـــــــــاتنا
              <BiSolidLeftTopArrowCircle size={20} />
            </Link>
          </div>
          {/* statistics */}
          <div className="flex flex-wrap">
            {data?.data?.data?.images?.map((statistic, index, arr) => {
              const colPerRow = 3; // عدد الأعمدة العادي
              const rowIndex = Math.floor(index / colPerRow); // الصف الحالي
              const startOfRow = rowIndex * colPerRow; // أول عنصر في الصف
              const itemsInRow = Math.min(colPerRow, arr.length - startOfRow); // عدد العناصر في الصف ده

              let widthClass = "xl:w-1/3 w-full"; // الافتراضي

              if (itemsInRow === 1) {
                widthClass = "w-full";
              } else if (itemsInRow === 2) {
                // العنصر الأول في الصف ياخد تلت، التاني ياخد تلتين
                if (index === startOfRow) widthClass = "xl:w-1/3 w-full";
                else widthClass = "xl:w-2/3 w-full";
              }

              return (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  key={index} className={`p-2 ${widthClass}`}>
                  <StatisticCard statistic={statistic} idx={index + 1} />
                </motion.div>
              );
            })}
          </div>

        </div> : ""}
    </motion.section>
  )
}

export default Satatistics
