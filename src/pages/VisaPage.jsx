import { useQuery } from "@tanstack/react-query"
import Footer from "../components/footer/Footer"
import Header from "../components/header/Header"
import VisaCard from "../components/visa/VisaCard"
import { fetchFromApi } from "../api/utils/fetchData"
import { useSearchParams } from "react-router-dom"
import Loading from "../components/loading/Loading"
import AlertWarning from "../components/alerts/AlertWarning"
import AlertError from "../components/alerts/AlertError"
import { motion } from "framer-motion"
import bg from "../../public/app/visabg.jpg"
const VisaPage = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const { data, isLoading, isError } = useQuery({
    queryKey: ['visa'],
    queryFn: async () => {
      const res = await fetchFromApi("/travel-visa");
      return res;
    }
  })

  if (isLoading) return <Loading />
  if (isError) return <div className="container">
    <AlertError>
      هناك خطاء ما
    </AlertError>
  </div>

  return (
    <main>
      <Header />
      {/* header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className={` bg-cover bg-center `}
        style={{
          backgroundImage: `url(${bg})`,
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        }}
      >
        <div className="py-16 bg-black/50">

          {/* content  */}
          <div className="container text-white text-center">
            {type ?
              <h1 className="xl:text-5xl md:text-4xl text-3xl font-bold ">تأشيرات {type == "sa" ? "السعودية" : "الإمارات العربية المتحدة"} الإلكترونية </h1>
              :
              <h1 className="xl:text-5xl md:text-4xl text-3xl font-bold ">التأشيرات الإلكترونية</h1>
            }

            <p className="  md:text-base text-sm m-auto font-light leading-relaxed mt-6">
              يمكن لأي شخص يَحمل جواز سفر الحصول على التأشيرة الإلكترونية وفقًا للشروط الموضوعة .
            </p>
            <p className="  md:text-base text-sm m-auto font-light leading-relaxed mt-6">
              يتم معالجة الطلب من 3 إلى 5 أيام عمل.          </p>
          </div>
        </div>
      </motion.div>
      {/* content */}
      <section className="my-16 container">
        {/* header of section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="  text-center xl:space-y-8 md:space-y-6 space-y-4">
          <p className="font-bold text-xs">أنواع التأشيرات</p>
          <h1 className="xl:text-6xl md:text-4xl text-3xl text-main-blue font-bold ">اختر نــوع تـــأشيرتك</h1>
          <p className="text-xs font-semibold">جميع التأشيرات صالحة ومعتمدة  ويمكن استخدامها لجميع وسائل النقل.</p>

        </motion.div>
        {/* grid */}
        {data?.data?.data?.otherVisas?.length > 0 ?
          <div className="grid grid-cols-12 gap-4  mt-16">
            {data?.data?.data?.otherVisas?.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1 }}
                key={index}
                className="col-span-12 md:col-span-6 xl:col-span-3  bg-body rounded-[50px]  p-6 h-full"
              >
                <VisaCard item={item} />
              </motion.div>
            ))}
          </div>
          : <AlertWarning>لا يوجد تأشيرات متاحه الان</AlertWarning>
        }
      </section>
      <Footer />
    </main>
  )
}

export default VisaPage
