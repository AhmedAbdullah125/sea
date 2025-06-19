import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import CustomFilterSelect from "./CustomFilterSelect"
import CustomDatePicker from "./CustomDatePicker"
import { MdStars } from "react-icons/md";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { fetchFromApi } from "../../../api/utils/fetchData"

// count 
const countOptions = Array.from({ length: 100 }, (_, i) => {
  const num = (i + 1).toString();
  return { label: num, value: num };
});


//dates
const datePickers = [
  {
    name: "date_and_time",
    label: "التـــاريخ و الوقـــت",
    placeholder: "مثل 22 / 05 / 2025. 10:48 صباحا ",
    icon: (
      < svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
        <path d="M5.81238 1.875C5.81238 1.56434 5.56054 1.3125 5.24988 1.3125C4.93922 1.3125 4.68738 1.56434 4.68738 1.875V3.05944C3.60788 3.14588 2.89921 3.35803 2.37856 3.87868C1.85791 4.39933 1.64576 5.108 1.55933 6.1875H16.4404C16.354 5.108 16.1418 4.39933 15.6212 3.87868C15.1005 3.35803 14.3919 3.14588 13.3124 3.05944V1.875C13.3124 1.56434 13.0605 1.3125 12.7499 1.3125C12.4392 1.3125 12.1874 1.56434 12.1874 1.875V3.00967C11.6884 3 11.1291 3 10.4999 3H7.49988C6.87061 3 6.31133 3 5.81238 3.00967V1.875Z" fill="#A71755" />
        <path fillRule="evenodd" clip-rule="evenodd" d="M1.5 9C1.5 8.37075 1.5 7.81148 1.50968 7.3125H16.4903C16.5 7.81148 16.5 8.37075 16.5 9V10.5C16.5 13.3284 16.5 14.7427 15.6213 15.6213C14.7427 16.5 13.3284 16.5 10.5 16.5H7.5C4.67157 16.5 3.25736 16.5 2.37868 15.6213C1.5 14.7427 1.5 13.3284 1.5 10.5V9ZM12.75 10.5C13.1642 10.5 13.5 10.1642 13.5 9.75C13.5 9.33577 13.1642 9 12.75 9C12.3358 9 12 9.33577 12 9.75C12 10.1642 12.3358 10.5 12.75 10.5ZM12.75 13.5C13.1642 13.5 13.5 13.1642 13.5 12.75C13.5 12.3358 13.1642 12 12.75 12C12.3358 12 12 12.3358 12 12.75C12 13.1642 12.3358 13.5 12.75 13.5ZM9.75 9.75C9.75 10.1642 9.41423 10.5 9 10.5C8.58578 10.5 8.25 10.1642 8.25 9.75C8.25 9.33577 8.58578 9 9 9C9.41423 9 9.75 9.33577 9.75 9.75ZM9.75 12.75C9.75 13.1642 9.41423 13.5 9 13.5C8.58578 13.5 8.25 13.1642 8.25 12.75C8.25 12.3358 8.58578 12 9 12C9.41423 12 9.75 12.3358 9.75 12.75ZM5.25 10.5C5.66421 10.5 6 10.1642 6 9.75C6 9.33577 5.66421 9 5.25 9C4.83579 9 4.5 9.33577 4.5 9.75C4.5 10.1642 4.83579 10.5 5.25 10.5ZM5.25 13.5C5.66421 13.5 6 13.1642 6 12.75C6 12.3358 5.66421 12 5.25 12C4.83579 12 4.5 12.3358 4.5 12.75C4.5 13.1642 4.83579 13.5 5.25 13.5Z" fill="#A71755" />
      </ svg>
    ),
  },
]

const formSchema = z.object({
  services: z.string().optional(),
  airport: z.string().optional(),
  country: z.string().optional(),
  number_of_person: z.string().nonempty("هذا الحقل مطلوب"),
  date_and_time: z.date({ required_error: "هذا الحقل مطلوب" }),
  moving_point: z.string().optional(),
  city: z.string().optional(),
})

const TransportForm = () => {
  const [type, setType] = useState("airport")
  const navigate = useNavigate()
  const { data } = useQuery({
    queryKey: [`all-filters`],
    queryFn: async () => {
      const res = await fetchFromApi("/all-filters");
      return res;
    }
  })
  const { data: servs } = useQuery({
    queryKey: [`services-transportation`],
    queryFn: async () => {
      const res = await fetchFromApi("/services-transportation");
      return res;
    }
  })

  // services
  const services = servs?.data?.data?.map((item) => ({ label: item?.service, value: String(item?.id) }))
  // airports
  const airports = data?.data?.data?.airport?.map((item) => ({ label: item, value: item }))
  // countries
  const countries = data?.data?.data?.countries?.map((item) => ({ label: item?.country, value: String(item?.id) }))
  // cites
  const cities = data?.data?.data?.cities?.map((item) => ({ label: item?.city, value: String(item?.id) }))
  // moving points
  const movingPoints = data?.data?.data?.movePoint?.map((item) => ({ label: item, value: item }))

  // select air port 
  const filterSelectFieldsAirport = [
    {
      name: "services",
      label: "نـــوع الخدمة",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clip-rule="evenodd" d="M9.82957 16.5H8.17042C5.58553 16.5 4.29307 16.5 3.41177 15.7412C2.53047 14.9823 2.34769 13.712 1.98213 11.1714L1.77305 9.71843C1.48847 7.7406 1.34618 6.75172 1.75153 5.90621C2.15687 5.0607 3.01964 4.54676 4.74518 3.51886L5.78381 2.90015C7.35078 1.96672 8.13427 1.5 9 1.5C9.86572 1.5 10.6493 1.96672 12.2162 2.90015L13.2548 3.51886C14.9803 4.54676 15.8432 5.0607 16.2484 5.90621C16.6538 6.75172 16.5115 7.7406 16.2269 9.71843L16.0179 11.1714C15.6523 13.712 15.4695 14.9823 14.5882 15.7412C13.7069 16.5 12.4144 16.5 9.82957 16.5ZM6.29818 11.6649C6.48317 11.4153 6.83546 11.363 7.08503 11.548C7.63132 11.9528 8.29065 12.1874 9.00007 12.1874C9.7095 12.1874 10.3688 11.9528 10.9151 11.548C11.1647 11.363 11.517 11.4153 11.7019 11.6649C11.887 11.9144 11.8346 12.2668 11.585 12.4517C10.8557 12.9923 9.96382 13.3124 9.00007 13.3124C8.03632 13.3124 7.14442 12.9923 6.41512 12.4517C6.16554 12.2668 6.11319 11.9144 6.29818 11.6649Z" fill="#A71755" />
        </svg>
      ),
      placeholder: "إدخـــال نــوع الخدمة من هنــا...",
      options: services
    },
    {
      name: "airport",
      label: "إخــتر المطار",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.89567 2.2193L12.6681 4.4693C17.2206 5.9918 17.2206 8.47432 12.6681 9.98932L10.6581 10.6568L9.99067 12.6668C8.47567 17.2193 5.98567 17.2193 4.47067 12.6668L2.21317 5.9018C1.20817 2.8643 2.85817 1.2068 5.89567 2.2193ZM5.65567 6.2543L8.50567 9.11932C8.61817 9.23182 8.76067 9.28432 8.90317 9.28432C9.04567 9.28432 9.18817 9.23182 9.30067 9.11932C9.51817 8.90182 9.51817 8.54182 9.30067 8.32432L6.45067 5.4593C6.23317 5.2418 5.87317 5.2418 5.65567 5.4593C5.43817 5.6768 5.43817 6.0368 5.65567 6.2543Z" fill="#A71755" />
        </svg>

      ),
      placeholder: "إدخـــال عدد الأشخاص هنــا...",
      options: airports
    },
    {
      name: "country",
      label: "إخــتر المكــان",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.4658 6.3375C14.6783 2.8725 11.6558 1.3125 9.00083 1.3125C9.00083 1.3125 9.00083 1.3125 8.99333 1.3125C6.3458 1.3125 3.3158 2.865 2.5283 6.33C1.6508 10.2 4.0208 13.4775 6.1658 15.54C6.9608 16.305 7.98083 16.6875 9.00083 16.6875C10.0208 16.6875 11.0408 16.305 11.8283 15.54C13.9733 13.4775 16.3433 10.2075 15.4658 6.3375ZM9.00083 10.095C7.69583 10.095 6.6383 9.0375 6.6383 7.7325C6.6383 6.4275 7.69583 5.37 9.00083 5.37C10.3058 5.37 11.3633 6.4275 11.3633 7.7325C11.3633 9.0375 10.3058 10.095 9.00083 10.095Z" fill="#A71755" />
        </svg>
      ),
      placeholder: "إدخـــال المكــان من هنــا...",
      options: countries
    },
    {
      name: "number_of_person",
      label: "عدد الأشخــــــــاص",
      icon: (
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.625 2.625C10.625 4.07475 9.44975 5.25 8 5.25C6.55025 5.25 5.375 4.07475 5.375 2.625C5.375 1.17525 6.55025 0 8 0C9.44975 0 10.625 1.17525 10.625 2.625Z" fill="#A71755" />
          <path d="M12.5 9.375C12.5 10.8248 10.4853 12 8 12C5.51472 12 3.5 10.8248 3.5 9.375C3.5 7.92525 5.51472 6.75 8 6.75C10.4853 6.75 12.5 7.92525 12.5 9.375Z" fill="#A71755" />
          <path d="M4.34155 0.75C4.47464 0.75 4.60458 0.763058 4.73005 0.78792C4.42438 1.33085 4.25001 1.95756 4.25001 2.625C4.25001 3.27619 4.41599 3.88862 4.70795 4.42227C4.58935 4.44437 4.46685 4.45595 4.34155 4.45595C3.28073 4.45595 2.42078 3.62634 2.42078 2.60297C2.42078 1.57961 3.28073 0.75 4.34155 0.75Z" fill="#A71755" />
          <path d="M3.08551 11.2396C2.65957 10.7304 2.375 10.1056 2.375 9.37509C2.375 8.66694 2.64243 8.05809 3.04684 7.55762C1.61833 7.66847 0.5 8.44974 0.5 9.39714C0.5 10.3534 1.63798 11.1404 3.08551 11.2396Z" fill="#A71755" />
          <path d="M11.7499 2.625C11.7499 3.27619 11.5839 3.88862 11.2919 4.42227C11.4106 4.44437 11.5331 4.45595 11.6584 4.45595C12.7192 4.45595 13.5791 3.62634 13.5791 2.60297C13.5791 1.57961 12.7192 0.75 11.6584 0.75C11.5253 0.75 11.3954 0.763058 11.2699 0.78792C11.5755 1.33085 11.7499 1.95756 11.7499 2.625Z" fill="#A71755" />
          <path d="M12.9144 11.2396C14.3619 11.1404 15.4999 10.3534 15.4999 9.39714C15.4999 8.44974 14.3816 7.66847 12.9531 7.55762C13.3575 8.05809 13.6249 8.66694 13.6249 9.37509C13.6249 10.1056 13.3404 10.7304 12.9144 11.2396Z" fill="#A71755" />
        </svg>
      ),
      placeholder: "إدخـــال عدد الأشخاص هنــا...",
      options: countOptions
    },
  ]
  // select privite tours
  const filterSelectFieldsPriviteTours = [
    {
      name: "moving_point",
      label: "نقطة الانطلاق",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clip-rule="evenodd" d="M9.82957 16.5H8.17042C5.58553 16.5 4.29307 16.5 3.41177 15.7412C2.53047 14.9823 2.34769 13.712 1.98213 11.1714L1.77305 9.71843C1.48847 7.7406 1.34618 6.75172 1.75153 5.90621C2.15687 5.0607 3.01964 4.54676 4.74518 3.51886L5.78381 2.90015C7.35078 1.96672 8.13427 1.5 9 1.5C9.86572 1.5 10.6493 1.96672 12.2162 2.90015L13.2548 3.51886C14.9803 4.54676 15.8432 5.0607 16.2484 5.90621C16.6538 6.75172 16.5115 7.7406 16.2269 9.71843L16.0179 11.1714C15.6523 13.712 15.4695 14.9823 14.5882 15.7412C13.7069 16.5 12.4144 16.5 9.82957 16.5ZM6.29818 11.6649C6.48317 11.4153 6.83546 11.363 7.08503 11.548C7.63132 11.9528 8.29065 12.1874 9.00007 12.1874C9.7095 12.1874 10.3688 11.9528 10.9151 11.548C11.1647 11.363 11.517 11.4153 11.7019 11.6649C11.887 11.9144 11.8346 12.2668 11.585 12.4517C10.8557 12.9923 9.96382 13.3124 9.00007 13.3124C8.03632 13.3124 7.14442 12.9923 6.41512 12.4517C6.16554 12.2668 6.11319 11.9144 6.29818 11.6649Z" fill="#A71755" />
        </svg>
      ),
      placeholder: "إدخـــال نقطة الانطلاق من هنــا...",
      options: movingPoints
    },
    {
      name: "city",
      label: "إخــتر  مدينة الوصول",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.89567 2.2193L12.6681 4.4693C17.2206 5.9918 17.2206 8.47432 12.6681 9.98932L10.6581 10.6568L9.99067 12.6668C8.47567 17.2193 5.98567 17.2193 4.47067 12.6668L2.21317 5.9018C1.20817 2.8643 2.85817 1.2068 5.89567 2.2193ZM5.65567 6.2543L8.50567 9.11932C8.61817 9.23182 8.76067 9.28432 8.90317 9.28432C9.04567 9.28432 9.18817 9.23182 9.30067 9.11932C9.51817 8.90182 9.51817 8.54182 9.30067 8.32432L6.45067 5.4593C6.23317 5.2418 5.87317 5.2418 5.65567 5.4593C5.43817 5.6768 5.43817 6.0368 5.65567 6.2543Z" fill="#A71755" />
        </svg>

      ),
      placeholder: "إدخـــال  مدينة الوصول من هنــا...",
      options: cities
    },
    {
      name: "number_of_person",
      label: "عدد الأشخــــــــاص",
      icon: (
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.625 2.625C10.625 4.07475 9.44975 5.25 8 5.25C6.55025 5.25 5.375 4.07475 5.375 2.625C5.375 1.17525 6.55025 0 8 0C9.44975 0 10.625 1.17525 10.625 2.625Z" fill="#A71755" />
          <path d="M12.5 9.375C12.5 10.8248 10.4853 12 8 12C5.51472 12 3.5 10.8248 3.5 9.375C3.5 7.92525 5.51472 6.75 8 6.75C10.4853 6.75 12.5 7.92525 12.5 9.375Z" fill="#A71755" />
          <path d="M4.34155 0.75C4.47464 0.75 4.60458 0.763058 4.73005 0.78792C4.42438 1.33085 4.25001 1.95756 4.25001 2.625C4.25001 3.27619 4.41599 3.88862 4.70795 4.42227C4.58935 4.44437 4.46685 4.45595 4.34155 4.45595C3.28073 4.45595 2.42078 3.62634 2.42078 2.60297C2.42078 1.57961 3.28073 0.75 4.34155 0.75Z" fill="#A71755" />
          <path d="M3.08551 11.2396C2.65957 10.7304 2.375 10.1056 2.375 9.37509C2.375 8.66694 2.64243 8.05809 3.04684 7.55762C1.61833 7.66847 0.5 8.44974 0.5 9.39714C0.5 10.3534 1.63798 11.1404 3.08551 11.2396Z" fill="#A71755" />
          <path d="M11.7499 2.625C11.7499 3.27619 11.5839 3.88862 11.2919 4.42227C11.4106 4.44437 11.5331 4.45595 11.6584 4.45595C12.7192 4.45595 13.5791 3.62634 13.5791 2.60297C13.5791 1.57961 12.7192 0.75 11.6584 0.75C11.5253 0.75 11.3954 0.763058 11.2699 0.78792C11.5755 1.33085 11.7499 1.95756 11.7499 2.625Z" fill="#A71755" />
          <path d="M12.9144 11.2396C14.3619 11.1404 15.4999 10.3534 15.4999 9.39714C15.4999 8.44974 14.3816 7.66847 12.9531 7.55762C13.3575 8.05809 13.6249 8.66694 13.6249 9.37509C13.6249 10.1056 13.3404 10.7304 12.9144 11.2396Z" fill="#A71755" />
        </svg>
      ),
      placeholder: "إدخـــال عدد الأشخاص هنــا...",
      options: countOptions
    },
  ]

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      services: "",
      number_of_person: "",
      country: "",
      airport: "",
      city: "",
      moving_point: "",
    },
  })
  // formate date
  function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }

  // 2. Define a submit handler.
  function onSubmit(values) {
    const formattedDate = formatDate(values.date_and_time);
    navigate(`/privite-tours?services=${values.services}&number_of_person=${values.number_of_person}&country=${values.country}&date_and_time=${formattedDate}&airport=${values.airport}&city=${values.city}&moving_point=${values.moving_point}`);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="xl:my-12 my-6 flex items-center justify-between max-md:flex-col max-md:gap-y-4">
          <div className="text-main-navy flex items-center gap-1">
            <MdStars className="xl:text-xl text-base" />
            <h2 className=" font-bold max-xl:text-sm">إخــتر خدمتــك إســــتقبال / توديــــــع المطار !.</h2>
          </div>
          <RadioGroup value={type} onValueChange={(value) => setType(value)} dir="rtl" className="flex items-center space-x-4">
            <div className="flex items-center gap-3" dir="rtl">
              <RadioGroupItem value="airport" id="option-one" />
              <Label className="me-2" htmlFor="option-one">نقل من و الى المطار</Label>
            </div>
            <div className="flex items-center gap-3" dir="rtl">
              <RadioGroupItem value="privite" id="option-two" />
              <Label className="me-2" htmlFor="option-two">جولات خـــاصة</Label>
            </div>
          </RadioGroup>
        </div>
        <div className={`grid ${type === "privite" ? "grid-cols-12" : "grid-cols-10"} gap-x-2 xl:gap-y-6 gap-y-4`}>
          {type == "airport" ?
            filterSelectFieldsAirport.map((fieldProps, index) => (
              <CustomFilterSelect key={index} {...fieldProps} form={form} colSpan={`${type === "privite" ? "xl:col-span-3 md:col-span-6 col-span-12" : "xl:col-span-2 md:col-span-5 col-span-10"}`} />
            )) :
            filterSelectFieldsPriviteTours.map((fieldProps, index) => (
              <CustomFilterSelect key={index} {...fieldProps} form={form} colSpan={`${type === "privite" ? "xl:col-span-3 md:col-span-6 col-span-12" : "xl:col-span-2 md:col-span-5 col-span-10"}`} />
            ))}
          {datePickers.map((item) => (
            <CustomDatePicker
              key={item.name}
              icon={item.icon}
              name={item.name}
              label={item.label}
              form={form}
              colSpan={`${type === "privite" ? "xl:col-span-3 md:col-span-6 col-span-12" : "xl:col-span-2 md:col-span-5 col-span-10"}`}
              placeholder={item.placeholder}
              disabledDate={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
            />
          ))}
          <Button type="submit" className={`${type == "privite" ? "col-span-12" : "col-span-10"} bg-main-purple w-fit m-auto text-white  hover:bg-main-blue transition-all duration-300  rounded-full flex items-center gap-14`}>بحـــــث
            <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_22_399)">
                <path d="M10.5 3.75H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M10.5 6H12.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15.75 8.625C15.75 12.5625 12.5625 15.75 8.625 15.75C4.6875 15.75 1.5 12.5625 1.5 8.625C1.5 4.6875 4.6875 1.5 8.625 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16.5 16.5L15 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_22_399">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>

          </Button>
        </div>
      </form>
    </Form>
  )
}

export default TransportForm
