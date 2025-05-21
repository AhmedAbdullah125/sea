import { FaGooglePlay } from "react-icons/fa";
import { GrApple } from "react-icons/gr";
const AppSection = () => {
  return (
    <section className='my-16 container flex items-center justify-between xl:gap-16 relative'>
      <img src="/public/app/bg-app.svg" alt="bg" loading='lazy' className='absolute top-0 start-1/2 size-[25rem] ' />

      {/* iphone */}
      <div className='xl:w-1/2 w-0 xl:h-screen'>
        <img src="/public/app/iphone.png" alt="iphone" loading='lazy' className='w-full h-full object-contain' />
      </div>
      {/* content */}
      <div className='xl:w-1/2 w-full '>
        {/* title */}
        <div className='xl:space-y-12 space-y-6 text-center xl:text-start'>
          <p className='text-xs text-main-purple font-bold'>التطبيق</p>
          <h3 className='text-5xl font-bold text-main-blue'>تطبيق ســـي / SEA</h3>
          <img src="/public/app/app-victor.svg" alt="victor" loading='lazy' className=' block m-auto' />
          <p className='text-lg text-main-navy'>استكشف، احجز، واستمتع... من جوالك!</p>
        </div>
        {/* buttons */}
        <div className="space-y-6 xl:mt-12 mt-6" >
          <p className='text-xs text-main-purple font-bold text-center xl:text-start'>عزيـــزنا العميل حمل التطبيـــق من هنا</p>
          <div className="flex items-center max-xl:justify-center gap-3">
            {/* apple */}
            <a href="#" className='w-fit flex items-center gap-2 text-white bg-black px-8 py-2 rounded-full border-2 border-black hover:bg-white hover:text-black'>
              <div className="text-end">
                <p className="text-[.5rem]">download on The</p>
                <p className="text-xs font-semibold">Apple Store</p>
              </div>
              <GrApple size={20}  />
            </a>
            {/* google */}
            <a href="#" className='w-fit flex items-center gap-2 text-white bg-main-blue px-8 py-2 rounded-full border-2 border-main-blue hover:bg-white hover:text-main-blue'>
              <div className="text-end">
                <p className="text-[.5rem]">download on The</p>
                <p className="text-xs font-semibold">google play</p>
              </div>
              <FaGooglePlay size={20}  />
            </a>
          </div>

        </div>
      </div>

    </section>
  )
}

export default AppSection
