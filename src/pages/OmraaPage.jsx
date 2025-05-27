import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { omraa } from "../data/visa"
const OmraaPage = () => {
  return (
    <main >
      {/* header */}
      <div className="bg-[url('/visa/omraa.png')] bg-cover bg-center py-16">
        {/* content  */}
        <div className="container text-white text-center ">
          <h1 className="xl:text-5xl md:text-4xl text-3xl font-bold ">تأشيرة العمــــرة الإلكترونية</h1>
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
        <div className="grid grid-cols-10 gap-4  mt-16">
          {omraa.map((item, index) => (

            <div key={index} className=" xl:col-span-2 md:col-span-5 col-span-10   px-14 py-10 flex flex-col justify-between items-center bg-body rounded-[50px] shadow">
              {item.icon}
              <p className="text-xs font-semibold text-main-navy text-center mt-4">
                {item.lable}
              </p>
            </div>
          ))}
          <div className="col-span-10">
            <Link to="/gate" className="h-12 px-6 m-auto mt-10 w-fit bg-main-purple  border-2 border-main-purple text-xs font-bold  text-white hover:bg-white hover:text-main-purple  flex items-center justify-center rounded-full ">
              احصل على تأشيرتك الآن
            </Link>
          </div>


        </div>

      </section>
      {/*  */}

      <section className='my-16 container flex items-center justify-between xl:gap-16 relative'>
        <img src="/public/app/bg-app.svg" alt="bg" loading='lazy' className='absolute top-0 start-0 size-[25rem] ' />


        {/* content */}
        <div className='xl:w-1/2 w-full '>
          {/* title */}
          <div className='xl:space-y-12 space-y-6 text-center xl:text-start relative'>
            <p className='text-xs text-main-purple font-bold'>السيــاحة</p>
            <h3 className='text-5xl font-bold text-main-blue leading-loose'>الــتـأشيرة السيـــاحية
              الإلكتـــرونية.
            </h3>
            <img src="/public/app/app-victor.svg" alt="victor" loading='lazy' className=' block m-auto absolute top-24 start-1/3 -translate-1/2' />
            <p className='text-lg text-main-navy'>نحن نؤمن بمرونة السفر، لذلك نوفر لك ساعة في معظم الفنادق. سافر بثقة واطمئنان، مع حرية التغيير متى ما احتجت.</p>
          </div>
          {/* buttons */}

          <div className="flex items-center max-xl:justify-center gap-3 xl:mt-12 mt-6">
            <Dialog  >
              <DialogTrigger className="h-10 px-8 w-fit bg-main-purple border-2 border-main-purple text-xs font-bold  text-white hover:bg-white hover:text-main-purple  flex items-center justify-center rounded-full ">عرض قـــائمة البدان</DialogTrigger>
              <DialogContent className='bg-white !rounded-xl ' >
                
                  <div  >
                    <h3 className="text-sm font-bold pb-3 mb-3 border-b">
                      الدول المؤهلة للحصول على التأشيرة السيــاحية !.
                    </h3>
                  <ul className="space-y-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                      
                      <li key={index} className="text-xs space-y-3">
                        <h2 className="text-black font-bold">تركيا</h2>
                        <p className="text-main-gray">أشيرة إلكترونية سهلة، تصدر بسرعة، تتطلب جواز صالح.</p>
                      </li>
                    ))}
                    </ul>
                  </div>
                
                <DialogClose asChild>
                  <Button type="button" className="mt-8 h-10 px-8 w-[40%] mx-auto bg-black border-2 border-black text-xs font-bold  text-white hover:bg-white hover:text-black  flex items-center justify-center rounded-full ">
                    إلغاء
                  </Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
            {/* gate */}
            <Link to="/gate" className="h-10 px-8   w-fit bg-main-blue  border-2 border-main-blue text-xs font-bold  text-white hover:bg-white hover:text-main-blue  flex items-center justify-center rounded-full ">
              قدم طلب الان
            </Link>
          </div>

        </div>
        {/* img */}
        <div className='xl:w-1/2 w-0 xl:h-screen'>
          <img src="/public/visa/saudi.png" alt="iphone" loading='lazy' className='w-full h-full object-contain' />
        </div>
      </section>
    </main>
  )
}

export default OmraaPage
