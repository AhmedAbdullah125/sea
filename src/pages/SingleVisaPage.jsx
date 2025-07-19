import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Link, useParams } from "react-router-dom"
import { omraa } from "../data/visa"
import { useQuery } from "@tanstack/react-query"
import { fetchFromApi } from "../api/utils/fetchData"
import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import Loading from "../components/loading/Loading"
import bgappImae from "../../public/app/bg-app.svg" 
import victorsvg from "../../public/app/app-victor.svg" 
const SingleVisaPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: [`visa-${id}`],
    queryFn: async () => {
      const res = await fetchFromApi(`/travel-visa/${id}`);
      return res
    }
  })
  const visa = data?.data?.data
  if (isLoading) return <Loading />
  if (isError) return <p>Error</p>
  return (
    <>
      <Header />
      {data?.data?.data ?
        <main >
          {/* header */}
          <div className="bg-[url('/visa/bg.png')] bg-cover bg-center py-16">
            {/* content  */}
            <div className="container text-white text-center ">
              <h1 className="xl:text-5xl md:text-4xl text-3xl font-bold ">تأشيرة {visa?.countryName} الإلكترونية</h1>
              <p className="  md:text-base text-sm m-auto font-light leading-relaxed mt-6">
                يمكن لأي شخص يَحمل جواز سفر الحصول على تأشيرة العمرة الإلكترونية وفقًا للشروط الموضوعة للمعتمر.
              </p>
              <p className="  md:text-base text-sm m-auto font-light leading-relaxed mt-6">
                يتم معالجة الطلب من 3 إلى 5 أيام عمل.          </p>
            </div>
          </div>

          <section className="my-16 container">
            {/* header of section */}
            <div className="  text-center xl:space-y-8 md:space-y-6 space-y-4">
              <p className="font-bold text-xs">أحصل عليها الان</p>
              <h1 className="xl:text-5xl md:text-4xl text-3xl text-main-blue font-bold ">خطــوات بسيطة للحصـــول عليها !</h1>
              <p className="text-xs font-semibold">جميع التأشيرات صالحة في جميع أنحاء المملكة العربية السعودية ويمكن استخدامها لجميع وسائل النقل.</p>

            </div>
            {/* cards */}
            <div className="mt-16">
            <div className=" flex flex-wrap justify-center gap-4">
              {visa?.steps?.map((item, index) => (
                <div
                  key={index}
                  className="w-[250px] px-0 pb-10 overflow-hidden flex flex-col justify-between items-center bg-body rounded-[50px] shadow"
                >
                  <img src={item.image} alt="icon" loading="lazy" className="w-full aspect-[3/2] object-cover" />
                  <p className="text-xs font-semibold text-main-navy text-center mt-4">
                    {item.text}
                  </p>
                </div>
              ))}
              </div>
              <Link to={"/gate"} className="h-12 px-6 m-auto mt-10 w-fit bg-main-purple   text-xs font-bold  !text-white hover:bg-main-blue transation-all duration-300  flex items-center justify-center rounded-full ">
                احصل على تأشيرتك الآن
              </Link>
            </div>

          </section>
          {/*  */}

          <section className='my-16 container flex items-center justify-between xl:gap-16 relative'>
            <img src={bgappImae} alt="bg" loading='lazy' className='absolute top-0 start-0 size-[25rem] ' />


            {/* content */}
            <div className='xl:w-1/2 w-full '>
              {/* title */}
              <div className='xl:space-y-12 space-y-6 text-center xl:text-start relative'>
                <p className='text-xs text-main-purple font-bold'>السيــاحة</p>
                <h3 className='text-5xl font-bold text-main-blue leading-loose'>الــتـأشيرة السيـــاحية
                  الإلكتـــرونية.
                </h3>
                <img src={"/public/app/app-victor.svg"} alt="victor" loading='lazy' className=' block m-auto absolute top-24 start-1/3 -translate-1/2' />
                <p className='text-lg text-main-navy'>نحن نؤمن بمرونة السفر، لذلك نوفر لك ساعة في معظم الفنادق. سافر بثقة واطمئنان، مع حرية التغيير متى ما احتجت.</p>
              </div>
              {/* buttons */}

              <div className="flex items-center max-xl:justify-center gap-3 xl:mt-12 mt-6">

                <Dialog  >
                  <DialogTrigger className="h-10 px-8 w-fit bg-main-purple  text-xs font-bold  text-white hover:bg-main-blue transation-all duration-300 flex items-center justify-center rounded-full ">عرض قـــائمة البلدان</DialogTrigger>
                  <DialogContent className='bg-white !rounded-xl ' >

                    <div  >
                      <h3 className="text-sm font-bold pb-3 mb-3 border-b">
                        الدول المؤهلة للحصول على التأشيرة السيــاحية !.
                      </h3>
                      <ul>
                        {visa?.countries?.map((item, index) => (
                          
                        <li key={index} className="text-xs space-y-3">
                            <h2 className="text-black font-bold">{item.country_name}</h2>
                            <p className="text-main-gray">{item?.country_need_paper}</p>
                        </li>
                        ))}

                      </ul>
                    </div>

                    <DialogClose asChild>
                      <Button type="button" className="mt-8 h-10 px-8 w-[40%] mx-auto bg-black  text-xs font-bold  text-white hover:bg-main-blue transation-all duration-300  flex items-center justify-center rounded-full ">
                        إلغاء
                      </Button>
                    </DialogClose>
                  </DialogContent>
                </Dialog>

                {/* gate */}
                <Link to="/gate" className="h-10 px-8   w-fit bg-main-blue   text-xs font-bold  !text-white hover:bg-main-purple transation-all duration-300  flex items-center justify-center rounded-full ">
                  قدم طلب الان
                </Link>
              </div>

            </div>
            {/* img */}
            <div className='xl:w-1/2 w-0 xl:h-screen rounded-[80px] overflow-hidden max-h-96'>
              <img src={visa?.image} alt="iphone" loading='lazy' className='w-full h-full object-cover'  />
            </div>
          </section>
        </main>
        : null
      }
      <Footer />
    </>
  )
}

export default SingleVisaPage
