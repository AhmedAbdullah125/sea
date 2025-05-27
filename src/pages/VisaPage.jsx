import VisaCard from "../components/visa/VisaCard"

const VisaPage = () => {
  return (
    <main>
      {/* header */}
      <div className="bg-[url('/visa/bg.png')] bg-cover bg-center py-16">
        {/* content  */}
        <div className="container text-white text-center ">
          <h1 className="xl:text-5xl md:text-4xl text-3xl font-bold ">تأشيرات الإمارات العربية المتحدة</h1>
          <p className="max-w-6xl xl:text-xl md:text-base text-sm m-auto font-light leading-relaxed mt-6">
          توفر دولة الإمارات العربية المتحدة أنواعاً مختلفة من التأشيرات المصممة خصيصاً لغرض ومدة زيارتك. فيما يلي أنواع التأشيرات الأكثر طلباً من قبل المسافرين        </p>
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
        <div className="grid grid-cols-12 gap-4  mt-16">
          {Array.from({ length: 12 }).map((_, index) => (<VisaCard key={index} />))}
        </div>
      </section>
      
    </main>
  )
}

export default VisaPage
