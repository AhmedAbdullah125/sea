import { IoLocationSharp } from "react-icons/io5";
import { FaUsers, FaCalendarAlt } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import React, { useEffect, useState } from 'react';
import Step1 from "../components/transport/Step1";
import Step2 from "../components/transport/Step2";
import Step3 from "../components/transport/Step3";
import Breadcrumbs from "../components/home/BreadCrumbs";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchFromApi } from "../api/utils/fetchData";


const ryail =
  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_243_2146)">
      <path d="M6.2236 10.6307C6.04515 11.0555 5.92719 11.5166 5.882 12L9.65831 11.1382C9.83676 10.7134 9.95463 10.2523 9.99991 9.7688L6.2236 10.6307Z" fill="#A71755" />
      <path d="M9.65803 8.55594C9.83648 8.1312 9.95444 7.67007 9.99963 7.18659L7.058 7.85833V6.56701L9.65794 5.97378C9.83639 5.54904 9.95435 5.08791 9.99954 4.60443L7.05791 5.27559V0.631619C6.60717 0.90335 6.20686 1.26505 5.88146 1.6917V5.54417L4.705 5.81265V0C4.25426 0.271635 3.85395 0.633434 3.52855 1.06008V6.08104L0.896223 6.68162C0.717775 7.10636 0.599729 7.56749 0.55445 8.05097L3.52855 7.37236V8.99854L0.341221 9.72577C0.162773 10.1505 0.0448163 10.6116 -0.00037384 11.0951L3.33587 10.3339C3.60745 10.2732 3.84087 10.1008 3.99263 9.86359L4.60448 8.88966V8.88947C4.66799 8.7887 4.705 8.66721 4.705 8.53636V7.10388L5.88146 6.83539V9.41803L9.65794 8.55575L9.65803 8.55594Z" fill="#A71755" />
    </g>
    <defs>
      <clipPath id="clip0_243_2146">
        <rect width="10" height="12" fill="white" />
      </clipPath>
    </defs>
  </svg>


const TransportPage = () => {
  const [searchParams] = useSearchParams();
  const tour_id = searchParams.get("transport_id");
  const starting_point = searchParams.get("starting_point");
  const date = searchParams.get("date");
  const people_count = searchParams.get("people_count");
  const car_type = searchParams.get("car_type");


  // step logic
  const [step, setStep] = useState(1);
  const nextStep = () => setStep(prev => prev + 1);
  // const prevStep = () => setStep(prev => prev - 1);

  const { data } = useQuery({
    queryKey: ['singleTour', tour_id],
    queryFn: async () => {
      const res = await fetchFromApi(`/transportation-tour/${tour_id}`);
      return res?.data?.data
    }
  });

  return (
    <>
      <Header />
      <main className='container my-16'>
        <section className='grid grid-cols-12 gap-4'>
          {/* breadcrumb */}
          <div className="xl:col-span-3 col-span-12 max-md:mb-8">
            <Breadcrumbs items={[{ label: "الرئيسية", href: "/" }, { label: "النقل و الجولات", href: "/transport" }]} />
          </div>
          {/* steps */}
          <div className="xl:col-span-9 col-span-12 flex items-center gap-2">
            <div className="w-1/3 space-y-2">
              <p className="font-bold md:text-xs text-[8px]">شروط الحجــــز </p>
              <div className={`bg-main-purple h-[6px]  rounded-full`}></div>
            </div>
            <div className="w-1/3 space-y-2">
              <p className="font-bold md:text-xs text-[8px]">بيـــانات الحجـــز</p>
              <div className={`${step === 2 || step === 3 ? "bg-main-purple" : "bg-body"}  h-[6px]  rounded-full`}></div>
            </div>
            <div className="w-1/3 space-y-2">
              <div className="flex items-center justify-between font-bold md:text-xs text-[8px]">
                <p className="">إكـــمال الحجـــز</p>
                <p className=" text-main-gray ">03 / <span className="text-black">0{step}</span> </p>
              </div>
              <div className={`${step === 3 ? "bg-main-purple" : "bg-body"}  h-[6px]  rounded-full`}></div>
            </div>
          </div>
          {/* transport ditals */}
          <div className='xl:col-span-3  col-span-12 bg-body rounded-[50px] p-8 xl:min-h-[90vh] flex flex-col justify-between items-center'>
            {/* details content */}
            <div className="pb-8 border-b-2 w-full" >
              <h2 className='text-main-blue text-sm font-bold '>تفاصيل عرض خدمة النقل و الجولات</h2>
              <p className='text-main-gray text-xs mt-2'>
                {starting_point}
              </p>
              <ul className="text-main-navy text-xs font-bold space-y-4 mt-10">
                <li className="flex items-center gap-1 ">
                  <IoLocationSharp size={16} />
                  <p className="line-clamp-1">{starting_point}</p>
                </li>
                <li className="flex items-center gap-1 ">
                  <FaUsers size={16} />
                  <p className="line-clamp-1">{people_count} أشخـــاص</p>
                </li>
                <li className="flex items-center gap-1 ">
                  <FaCalendarAlt size={16} />
                  <p>
                    {new Date(date).toLocaleString("ar-EG", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </li>
              </ul>
            </div>
            {/* price content */}
            <Accordion type="single" collapsible defaultValue="price" className="w-full">
              <AccordionItem value="price" className="border-none">
                <AccordionTrigger className="text-main-blue text-xs font-semibold hover:underline-none ">تفاصيل التكلفة ({data?.currencyName})</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 mt-6"  >
                  <div className="text-xs font-semibold flex items-center justify-between">
                    {
                      data?.services.map((item, index) => (
                        <>
                          <p>{item.name} :</p>
                          <p className="text-main-blue text-sm  flex items-center gap-1">{parseFloat(item?.price).toFixed(2)}
                            <span>{data?.currencyName}</span>
                          </p>
                        </>
                      ))
                    }
                  </div>
                  <div className="text-xs font-semibold flex items-center justify-between">
                    <p>المجموع الفرعي:</p>
                    <p className="text-main-blue text-sm  flex items-center gap-1">{parseFloat(data?.totalServicePrice).toFixed(2)}
                      <span>{data?.currencyName}</span>
                    </p>
                  </div>
                  <div className="text-sm font-bold flex items-center justify-between">
                    <p>الإجمالي:</p>
                    <p className="text-main-blue   flex items-center gap-1">  {(Number(data?.totalServicePrice)).toFixed(2)}
                      <span>{data?.currencyName}</span>
                    </p>
                  </div>

                </AccordionContent>
              </AccordionItem>
            </Accordion>

          </div>
          {/* steps */}
          <div className='xl:col-span-9  col-span-12 bg-body rounded-[50px] p-8 flex items-center justify-center'>
            {step === 1 && <Step1 nextStep={nextStep} alerts={data?.alerts} />}
            {step === 2 && <Step2 nextStep={nextStep} transportId={tour_id} starting_point={starting_point} people_count={people_count} date={date} car_type={car_type} />}
            {step === 3 && <Step3 />}

          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

export default TransportPage
