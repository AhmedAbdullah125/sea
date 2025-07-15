import React from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ImagesGallery from '../components/singleTour/ImagesGallery';
import { TiStarFullOutline } from 'react-icons/ti';
import { PiSealCheckFill } from 'react-icons/pi';
import { IoIosArrowBack } from 'react-icons/io';
import Comments from '../components/singleTour/Comments';
import PriceForm from '../components/singleTour/PriceForm';
import Loader from '../components/loader/Loader';
import AlertError from '../components/alerts/AlertError';
import { fetchFromApi } from '../api/utils/fetchData';
const logo = <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="58" height="58" rx="29" fill="white" />
  <path fill-rule="evenodd" clip-rule="evenodd" d="M30.1177 26.2208C33.9456 24.5015 38.4963 26.0963 40.2817 29.783C42.0672 33.4688 40.411 37.8512 36.5823 39.5697C32.7544 41.2889 17.001 40.2358 17.001 40.2358C17.001 40.2358 26.2898 27.9392 30.1177 26.22V26.2208Z" fill="#6D7172" />
  <path fill-rule="evenodd" clip-rule="evenodd" d="M27.8827 31.7796C24.0548 33.4989 19.5041 31.9041 17.7186 28.2174C15.9331 24.5315 17.5894 20.1492 21.418 18.4307C25.2459 16.7114 40.9994 17.7645 40.9994 17.7645C40.9994 17.7645 31.7105 30.0611 27.8827 31.7804V31.7796Z" fill="url(#paint0_linear_324_3821)" />
  <path fill-rule="evenodd" clip-rule="evenodd" d="M30.1177 26.2208C33.9456 24.5015 38.4963 26.0963 40.2817 29.783C42.0672 33.4688 40.411 37.8512 36.5823 39.5697C32.7544 41.2889 17.001 40.2358 17.001 40.2358C17.001 40.2358 26.2898 27.9392 30.1177 26.22V26.2208Z" fill="url(#paint1_linear_324_3821)" />
  <defs>
    <linearGradient id="paint0_linear_324_3821" x1="16.9998" y1="24.9584" x2="40.9994" y2="24.9584" gradientUnits="userSpaceOnUse">
      <stop stop-color="#016AB5" />
      <stop offset="0.27" stop-color="#016AB5" />
      <stop offset="0.65" stop-color="#174474" />
      <stop offset="1" stop-color="#174474" />
    </linearGradient>
    <linearGradient id="paint1_linear_324_3821" x1="17.0002" y1="33.042" x2="40.9998" y2="33.042" gradientUnits="userSpaceOnUse">
      <stop stop-color="#A71755" />
      <stop offset="0.35" stop-color="#A71755" />
      <stop offset="0.61" stop-color="#6F0635" />
      <stop offset="1" stop-color="#0D1214" />
    </linearGradient>
  </defs>
</svg>
const advantages = [
  {
    icon: <svg width="64" height="59" viewBox="0 0 64 59" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M27.1985 29.4999C34.5622 29.4999 40.5318 23.5304 40.5318 16.1666C40.5318 8.8028 34.5622 2.83325 27.1985 2.83325C19.8348 2.83325 13.8652 8.8028 13.8652 16.1666C13.8652 23.5304 19.8348 29.4999 27.1985 29.4999Z" stroke="#091B3C" strokeWidth="4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M2.66699 56.1667C4.18801 50.9219 7.32819 46.2923 11.6387 42.9397C15.9492 39.5872 21.2093 37.6832 26.667 37.5C37.6537 37.5 47.0137 45.26 50.667 56.1667" stroke="#091B3C" strokeWidth="4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M47.5216 9.34009C49.5528 10.3815 51.1965 12.0471 52.2109 14.0921C53.2253 16.137 53.557 18.4533 53.157 20.7008C52.757 22.9482 51.6466 25.0079 49.989 26.5775C48.3317 28.1469 46.2141 29.1431 43.9482 29.4199" stroke="#091B3C" strokeWidth="4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M46.1875 36.3535C49.7448 37.2599 53.0078 39.0687 55.6611 41.6055C58.3147 44.1421 60.2686 47.3204 61.3342 50.8332" stroke="#091B3C" strokeWidth="4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>,
    title: "04 أشخــــاص",
  },
  {
    icon: <svg width="58" height="59" viewBox="0 0 58 59" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M39.6673 25.5C39.6673 27.7091 38.4735 29.5 37.0007 29.5C35.5279 29.5 34.334 27.7091 34.334 25.5C34.334 23.2909 35.5279 21.5 37.0007 21.5C38.4735 21.5 39.6673 23.2909 39.6673 25.5Z" fill="#091B3C" />
      <path d="M23.6673 25.5C23.6673 27.7091 22.4734 29.5 21.0007 29.5C19.5279 29.5 18.334 27.7091 18.334 25.5C18.334 23.2909 19.5279 21.5 21.0007 21.5C22.4734 21.5 23.6673 23.2909 23.6673 25.5Z" fill="#091B3C" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M23.5169 0.833253H23.6673C24.7719 0.833253 25.6673 1.72869 25.6673 2.83325C25.6673 3.93781 24.7719 4.83325 23.6673 4.83325C18.5825 4.83325 14.97 4.83749 12.2296 5.20595C9.54668 5.56664 8.00095 6.24309 6.87239 7.37165C5.74383 8.50021 5.06737 10.0459 4.70668 12.7289C4.33823 15.4693 4.33399 19.0817 4.33399 24.1666C4.33399 25.2711 3.43855 26.1666 2.33399 26.1666C1.22943 26.1666 0.333986 25.2711 0.333986 24.1666V24.0161C0.333932 19.1154 0.333905 15.2338 0.742359 12.1959C1.16268 9.06941 2.04833 6.53888 4.04396 4.54323C6.03961 2.5476 8.57015 1.66195 11.6966 1.24163C14.7345 0.833173 18.6162 0.8332 23.5169 0.833253ZM45.7719 5.20595C43.0313 4.83749 39.4188 4.83325 34.334 4.83325C33.2295 4.83325 32.334 3.93781 32.334 2.83325C32.334 1.72869 33.2295 0.833253 34.334 0.833253H34.4844C39.3852 0.8332 43.2668 0.833173 46.3047 1.24163C49.4311 1.66195 51.9617 2.5476 53.9575 4.54323C55.9529 6.53888 56.8385 9.06941 57.2591 12.1959C57.6673 15.2338 57.6673 19.1155 57.6673 24.0162V24.1666C57.6673 25.2711 56.7719 26.1666 55.6673 26.1666C54.5628 26.1666 53.6673 25.2711 53.6673 24.1666C53.6673 19.0817 53.6631 15.4693 53.2945 12.7289C52.934 10.0459 52.2575 8.50021 51.1289 7.37165C50.0004 6.24309 48.4545 5.56664 45.7719 5.20595ZM2.33399 32.8333C3.43855 32.8333 4.33399 33.7287 4.33399 34.8333C4.33399 39.9181 4.33823 43.5306 4.70668 46.2711C5.06737 48.9538 5.74383 50.4997 6.87239 51.6282C8.00095 52.7567 9.54668 53.4333 12.2296 53.7938C14.97 54.1623 18.5825 54.1666 23.6673 54.1666C24.7719 54.1666 25.6673 55.0621 25.6673 56.1666C25.6673 57.2711 24.7719 58.1666 23.6673 58.1666H23.5169C18.6162 58.1666 14.7345 58.1666 11.6966 57.7583C8.57015 57.3378 6.03961 56.4522 4.04396 54.4567C2.04833 52.461 1.16268 49.9303 0.742359 46.8039C0.333905 43.7661 0.333932 39.8845 0.333986 34.9837V34.8333C0.333986 33.7287 1.22943 32.8333 2.33399 32.8333ZM55.6673 32.8333C56.7719 32.8333 57.6673 33.7287 57.6673 34.8333V34.9837C57.6673 39.8845 57.6673 43.7661 57.2591 46.8039C56.8385 49.9303 55.9529 52.461 53.9575 54.4567C51.9617 56.4522 49.4311 57.3378 46.3047 57.7583C43.2668 58.1666 39.3852 58.1666 34.4844 58.1666H34.334C33.2295 58.1666 32.334 57.2711 32.334 56.1666C32.334 55.0621 33.2295 54.1666 34.334 54.1666C39.4188 54.1666 43.0313 54.1623 45.7719 53.7938C48.4545 53.4333 50.0004 52.7567 51.1289 51.6282C52.2575 50.4997 52.934 48.9538 53.2945 46.2711C53.6631 43.5306 53.6673 39.9181 53.6673 34.8333C53.6673 33.7287 54.5628 32.8333 55.6673 32.8333ZM19.3939 38.9757C20.0517 38.0882 21.3043 37.9021 22.1916 38.5599C24.134 39.9994 26.4783 40.8333 29.0007 40.8333C31.5231 40.8333 33.8673 39.9994 35.8097 38.5599C36.6972 37.9021 37.9497 38.0882 38.6073 38.9757C39.2652 39.8631 39.0791 41.1157 38.1916 41.7733C35.5985 43.6954 32.4273 44.8333 29.0007 44.8333C25.574 44.8333 22.4028 43.6954 19.8097 41.7733C18.9223 41.1157 18.7362 39.8631 19.3939 38.9757Z" fill="#091B3C" />
    </svg>,
    title: "شــاشة التلفزيـــون"
  },
  {
    icon: <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M44.5 0.5C51.1274 0.5 56.5 5.87258 56.5 12.5V52.5C56.5 59.1274 51.1274 64.5 44.5 64.5H20.5C13.8726 64.5 8.5 59.1274 8.5 52.5V12.5C8.5 5.87258 13.8726 0.5 20.5 0.5H44.5ZM20.5 40.5C19.3954 40.5 18.5 41.3954 18.5 42.5V46.5C18.5 47.6046 19.3954 48.5 20.5 48.5C21.6046 48.5 22.5 47.6046 22.5 46.5V42.5C22.5 41.3954 21.6046 40.5 20.5 40.5ZM50.5 30.5H14.5C13.3954 30.5 12.5 31.3954 12.5 32.5C12.5 33.6046 13.3954 34.5 14.5 34.5H50.5C51.6046 34.5 52.5 33.6046 52.5 32.5C52.5 31.3954 51.6046 30.5 50.5 30.5ZM20.5 16.5C19.3954 16.5 18.5 17.3954 18.5 18.5V22.5C18.5 23.6046 19.3954 24.5 20.5 24.5C21.6046 24.5 22.5 23.6046 22.5 22.5V18.5C22.5 17.3954 21.6046 16.5 20.5 16.5Z" fill="#091B3C" />
    </svg>
    ,
    title: "ثلاجــة مشروبــات"
  },
  {
    icon: <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M53.6667 37.1668V26.5002C53.6667 18.9577 53.6667 15.1865 51.3235 12.8433C49.1227 10.6425 45.6621 10.5089 39 10.5007V53.1663C45.6621 53.1583 49.1227 53.0244 51.3235 50.8236C53.6667 48.4807 53.6667 44.7092 53.6667 37.1668ZM45.6667 23.8332C47.1395 23.8332 48.3333 25.0271 48.3333 26.4999C48.3333 27.9727 47.1395 29.1666 45.6667 29.1666C44.1939 29.1666 43 27.9727 43 26.4999C43 25.0271 44.1939 23.8332 45.6667 23.8332ZM45.6667 34.4999C47.1395 34.4999 48.3333 35.6938 48.3333 37.1666C48.3333 38.6394 47.1395 39.8332 45.6667 39.8332C44.1939 39.8332 43 38.6394 43 37.1666C43 35.6938 44.1939 34.4999 45.6667 34.4999Z" fill="#091B3C" />
      <path d="M36.5181 3.80163L30.7765 10.5003H34.9997V53.1669H16.333C8.79053 53.1669 5.0193 53.1669 2.67615 50.8237C0.333008 48.4808 0.333008 44.7093 0.333008 37.1669V26.5003C0.333008 18.9578 0.333008 15.1866 2.67615 12.8434C5.0193 10.5003 8.79053 10.5003 16.333 10.5003H23.2229L17.4811 3.80163C16.7623 2.96296 16.8594 1.70037 17.698 0.981521C18.5367 0.262695 19.7993 0.359815 20.5182 1.19846L26.9997 8.76019L33.481 1.19846C34.1999 0.359815 35.4626 0.262668 36.3013 0.981521C37.1399 1.70037 37.237 2.96296 36.5181 3.80163Z" fill="#091B3C" />
    </svg>,
    title: "06 أشخــــاص Tax"
  }
]


const SingleTourPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['singleTour', id],
    queryFn: async () => {
      const res = await fetchFromApi(`/transportation-tour/${id}`);
      return res?.data?.data
    }
  });



  if (isLoading) return <Loader />;
  if (isError) return <div className='container my-12'>
    <AlertError>هناك خطاء ما</AlertError>
  </div>;
  return (
    <>
      <Header />
      <p>{id}</p>
      <main className="my-16 container space-y-6">
        {/* title */}
        <div className='space-y-2 '>
          <h1 className="text-4xl font-bold line-clamp-1" >{data?.model}</h1 >
          {/* rate */}
          <div className="flex items-end gap-1 w-fit" >
            <TiStarFullOutline size={14} className="text-yellow-500" />
            <p className="p-0 m-0 text-[10px] font-semibold">{data?.rating} ({data?.total_rating}) </p>
          </div >
        </div>
        <ImagesGallery images={data?.images} />
        {/* details */}
        <div className='grid grid-cols-12 gap-2'>
          <div className='col-span-12 xl:col-span-7 space-y-4'>
            {/* sea */}
            <Link to={"/"} className="flex items-center justify-between w-full bg-body  px-5 py-2 rounded-full">
              {/* content */}
              <div className="flex items-center gap-2">
                {logo}
                <div>
                  <h3 className="text-main-navy font-bold flex items-start gap-1 max-md:text-xs">
                    ضمــــــــان سي / SEA.
                    <PiSealCheckFill />
                  </h3>
                  <p className="text-main-gray text-xs mt-1">نضمن لك صحة المعلومات ونظافة المكان</p>
                </div>
              </div>
              {/* arrow */}
              <div className="shrink-0 size-6 text-white bg-main-navy border border-main-navy hover:bg-transparent hover:text-main-navy rounded-full flex items-center justify-center transition-all duration-200">
                <IoIosArrowBack size={14} />
              </div>
            </Link>
            {/* discription */}
            <div className='space-y-2 '>
              <h3 className='text-sm font-bold text-main-purple'>الوصف</h3>
              <p className='text-xs text-main-navy  leading-loose ' dangerouslySetInnerHTML={{ __html: data?.description }}></p>
              {/* advantages */}
              {data?.alerts?.length > 0 &&
                <div className='grid grid-cols-12 gap-2'>
                  {data?.alerts?.map((item, index) => (
                    <div key={index} className="col-span-12 xl:col-span-6 py-12 flex items-center justify-center  rounded-[40px] bg-body">
                      <div className="flex flex-col justify-center items-center gap-6 ">
                        <img src={item?.image} alt="alert" className="w-12 h-12" />
                        <p className="text-[10px] font-bold text-main-navy text-center">{item?.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              }

            </div>
            {/* seprator */}
            <div className='bg-body h-[1.5px]'></div>
            {/* comments */}
            <div className='space-y-2 '>
              <h3 className='text-sm font-bold text-main-purple'>تقييمات الضيـــوف</h3>
              <Comments comments={data?.comments} id={id} />
            </div>
            {/* iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.03104066285!2d31.196729875010096!3d30.035967318973345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145846c9306e97af%3A0x5315ebf6378470c0!2sRoute!5e0!3m2!1sen!2seg!4v1750319686961!5m2!1sen!2seg"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full rounded-[40px]"
            ></iframe>
          </div>
          {/* form  */}
          <div className='col-span-12 xl:col-span-5 space-y-4'>
            <PriceForm tourId={data?.id}  price={data?.totalServicePrice} discount={data?.discount} />
          </div>
        </div>

      </main>
      <Footer />

    </>
  )
}

export default SingleTourPage

