import { useQuery } from "@tanstack/react-query"
import Footer from "../components/footer/Footer"
import Header from "../components/header/Header"
import VisaCard from "../components/visa/VisaCard"
import { fetchFromApi } from "../api/utils/fetchData"
import { use } from "react"
import { useSearchParams } from "react-router-dom"

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


  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error</p>

  return (
    <main>
      <Header />
      {/* header */}
      <div className="bg-[url('/visa/bg.png')] bg-cover bg-center py-16">
        {/* content  */}
        <div className="container text-white text-center ">
          <h1 className="xl:text-5xl md:text-4xl text-3xl font-bold ">تأشيرات {type == "sa" ? "السعودية" :"الإمارات العربية المتحدة"} </h1>
          <p className="max-w-6xl xl:text-xl md:text-base text-sm m-auto font-light leading-relaxed mt-6">
            توفر دولة {type == "sa" ? "السعودية" : "الإمارات العربية المتحدة"} أنواعاً مختلفة من التأشيرات المصممة خصيصاً لغرض ومدة زيارتك. فيما يلي أنواع التأشيرات الأكثر طلباً من قبل المسافرين        </p>
        </div>
      </div>
      {/* content */}
      <section className="my-16 container">
        {/* header of section */}
        <div className="  text-center xl:space-y-8 md:space-y-6 space-y-4">
          <p className="font-bold text-xs">أنواع التأشيرات</p>
          <h1 className="xl:text-6xl md:text-4xl text-3xl text-main-blue font-bold ">إختر نــوع تـــأشيرتك</h1>
          <p className="text-xs font-semibold">جميع التأشيرات صالحة في جميع أنحاء الإمارات العربية المتحدة ويمكن استخدامها لجميع وسائل النقل.</p>

        </div>
        {/* grid */}
        {data?.data?.data?.length > 0 ?
          <div className="grid grid-cols-12 gap-4  mt-16">
            {data?.data?.data?.map((item, index) => (<VisaCard key={index} item={item} />))}
          </div>
          : "no data"
        }
      </section>
      <Footer />
    </main>
  )
}

export default VisaPage
