import React from 'react'
import AboutUSCard from './AboutUSCard'

const features = [{
  id: 1,
  title: "ضمان، توفير، سرعة، موثوقية.",
  content: "نوفر لك ضمان أفضل الأسعار لأشهر الفنادق حول العالم، دون الحاجة للبحث الطويل أو مقارنة العروض. بأسعار مميزة مدروسة...",
},
{
  id: 2,
  title: "طــــرق دفع آمنـــــــــة.",
  content: "نضمن لك تجربة حجز مريحة من البداية حتى الدفع. جميع وسائل الدفع المتوفرة على منصتنا معتمدة، مؤمنة، وتراعي أعلى معايير الحماية الإلكترونية...",
},
{
  id: 3,
  title: "إلغاء مجاني قبل 48 ســـــاعة.",
  content: "نحن نؤمن بمرونة السفر، لذلك نوفر لك إمكانية الإلغاء المجاني للحجز قبل 48 ساعة في معظم الفنادق. سافر بثقة واطمئنان، مع حرية التغيير متى ما احتجت..",
},
{
  id: 4,
  title: "صور حقيقية تضمن الواقعية.",
  content: "نحن نعرض لك صورًا ومقاطع فيديو حقيقية لكل مكان إقامة، لتكون تجربتك شفافة وواضحة قبل الحجز.",
},
]
const AboutUS = () => {
  return (
    <section className='my-16 py-16 bg-body rounded-3xl xl:rounded-[6.25rem]'>
      <div className='container flex flex-col max-xl:gap-4 xl:flex-row items-center justify-between'>
        {/* content */}
        <div className='xl:w-1/3 w-full '>
          <div className=' text-center xl:text-start space-y-2 '>
            <h2 className='text-xs font-bold text-main-navy'>لمــــاذا نحن !.</h2>

            <h3 className='text-main-blue max-md:text-nowrap font-bold xl:text-5xl md:text-3xl text-xl xl:leading-relaxed'>
              ليـــش سي تحــــتاجها في رحلتـــــك !.
            </h3>
            <p className='text-main-navy text-xs'>سواء كنت مسافر للعمل أو للراحة، سي تقدم لك كل اللي تحتاجه في مكان واحد.</p>
          </div>
          <div className="xl:mt-32 mt-2 flex items-center max-xl:justify-center  gap-2 w-full">
            <button className="h-8  rounded-full   bg-main-purple text-white text-xs font-semibold px-6">إحجـــز رحلتك الان</button>
            <button className="size-8 bg-main-purple rounded-full flex items-center justify-center">
              <img src="/pakages/plane.svg" alt="icon" loading="lazy" />
            </button>
          </div>
        </div>
        {/* grid */}
        <div className='xl:w-2/3 w-full grid grid-cols-12 gap-4'>
          {features.map((feature) => (<AboutUSCard key={feature.id} feature={feature} />))}
        </div>
      </div>

    </section>
  )
}

export default AboutUS
