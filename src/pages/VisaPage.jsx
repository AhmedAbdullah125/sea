import { useQuery } from "@tanstack/react-query"
import Footer from "../components/footer/Footer"
import Header from "../components/header/Header"
import VisaCard from "../components/visa/VisaCard"
import { fetchFromApi } from "../api/utils/fetchData"
import { useSearchParams } from "react-router-dom"
import Loading from "../components/loading/Loading"
import AlertWarning from "../components/alerts/AlertWarning"
import AlertError from "../components/alerts/AlertError"
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
      <div className="bg-[url('/visa/bg.png')] bg-cover bg-center py-16">
        {/* content  */}
        <div className="container text-white text-center ">
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
      {/* content */}
      <section className="my-16 container">
        {/* header of section */}
        <div className="  text-center xl:space-y-8 md:space-y-6 space-y-4">
          <p className="font-bold text-xs">أنواع التأشيرات</p>
          <h1 className="xl:text-6xl md:text-4xl text-3xl text-main-blue font-bold ">إختر نــوع تـــأشيرتك</h1>
          <p className="text-xs font-semibold">جميع التأشيرات صالحة ومعتمدة  ويمكن استخدامها لجميع وسائل النقل.</p>

        </div>
        {/* grid */}
        {data?.data?.data?.length > 0 ?
          <div className="grid grid-cols-12 gap-4  mt-16">
            {data?.data?.data?.map((item, index) => (<VisaCard key={index} item={item} />))}
          </div>
          : <AlertWarning>لا يوجد تأشيرات متاحه الان</AlertWarning>
        }
      </section>
      <Footer />
    </main>
  )
}

export default VisaPage
