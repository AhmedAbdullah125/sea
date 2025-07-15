import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsFillSendFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FaCalendarDays, FaCommentSms, FaLink } from "react-icons/fa6";
import { TbPentagonFilled } from "react-icons/tb";
import { z } from "zod";
import { fetchFromApi } from "../../api/utils/fetchData";
import { useNavigate } from "react-router-dom"
const countOptions = Array.from({ length: 100 }, (_, i) => {
  const num = (i + 1).toString();
  return { label: num, value: num };
});
const ryial = <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clipPath="url(#clip0_324_4126)">
    <path d="M8.71261 15.0601C8.46278 15.662 8.29764 16.3151 8.23438 17L13.5212 15.779C13.771 15.1773 13.936 14.524 13.9994 13.8391L8.71261 15.0601Z" fill="#A71755" />
    <path d="M13.5218 12.1209C13.7716 11.5192 13.9367 10.8659 14 10.181L9.88172 11.1326V9.30326L13.5216 8.46286C13.7715 7.86114 13.9366 7.20787 13.9999 6.52294L9.8816 7.47375V0.894794C9.25056 1.27975 8.69013 1.79216 8.23456 2.39658V7.85424L6.58752 8.23459V0C5.95648 0.384817 5.39605 0.897365 4.94049 1.50179V8.61481L1.25524 9.46563C1.00541 10.0673 0.840144 10.7206 0.776754 11.4055L4.94049 10.4442V12.7479L0.478232 13.7782C0.228406 14.3799 0.0632661 15.0332 0 15.7181L4.67073 14.6397C5.05095 14.5538 5.37775 14.3095 5.59021 13.9734L6.4468 12.5937V12.5934C6.53572 12.4507 6.58752 12.2786 6.58752 12.0932V10.0638L8.23456 9.68347V13.3422L13.5216 12.1206L13.5218 12.1209Z" fill="#A71755" />
  </g>
  <defs>
    <clipPath id="clip0_324_4126">
      <rect width="14" height="17" fill="white" />
    </clipPath>
  </defs>
</svg>


// schema
export const filterSchema = z.object({
  starting_point: z.string().nonempty("هذا الحقل مطلوب"),
  date: z.coerce.date({
    errorMap: () => ({ message: "يرجى إدخال تاريخ انتهاء صالح" }),
  }),
  people_count: z.string().nonempty("هذا الحقل مطلوب"),
  car_type: z.string().nonempty("هذا الحقل مطلوب"),
});

const PriceForm = ({ price, discount, tourId,tour }) => {
  const navigate =useNavigate();
  const { data } = useQuery({
    queryKey: [`all-filters`],
    queryFn: async () => {
      const res = await fetchFromApi("/all-filters");
      return res;
    }
  })

console.log(tour);

  const movingPoints = data?.data?.data?.movePoint?.map((item) => ({ label: item, value: item }))
  // car types
  const carTypes = data?.data?.data?.carType?.map((item) => ({ label: item?.name, value: item?.name }))

  const form = useForm({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      starting_point: "",
      people_count: "",
      car_type: "",
    }
  });
  // format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const onSubmit = (data) => {
    navigate(`/transport/?transport_id=${tourId}&starting_point=${data?.starting_point}&date=${formatDate(data?.date)}&people_count=${data?.people_count}&car_type=${data?.car_type}`);
  };

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-body p-4 rounded-[30px]">
        {/* price */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className=" flex items-center gap-1 text-main-blue font-bold"><del className="text-main-gray text-sm">{parseFloat(price).toFixed(2)}</del> {parseFloat(price - discount).toFixed(2)} {ryial} <span className="text-main-purple font-semibold text-sm">/ لليوم الواحــــدة</span></p>
            <p className="text-xs font-semibold text-main-gray">
              إجمالي لليوم {parseFloat(price - discount).toFixed(2)}ر.س
            </p>
          </div>
          {/* sale */}
          <div className="bg-main-purple rounded-full text-white text-xs font-bold py-3 px-4 flex items-center justify-center w-fit ">
            خصم %{Number(tour.discount).toFixed(1)}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-4 gap-y-6">
          {/* Type */}
          <FormField
            control={form.control}
            name="car_type"
            render={({ field }) => (
              <FormItem className="xl:col-span-6 col-span-12">
                <FormLabel className="flex items-center gap-1">
                  <BsFillSendFill size={16} className="text-main-purple" />
                  <p className="text-main-blue font-bold text-sm">
                    نوع السيارة
                  </p>
                </FormLabel>
                <Select
                  dir="rtl"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                      <ChevronDown size={14} />
                    </div>} className={`bg-white  text-[#797979]  text-xs font-semibold border-none  rounded-full h-12`}>
                      <SelectValue placeholder={"إدخـــال نوع السيارة هنــا..."} className="text-[#797979]" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className=" shadow border-none rounded-xl bg-white">
                    {carTypes?.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="cursor-pointer focus:bg-body rounded-xl">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500  text-xs " />
              </FormItem>
            )}
          />

          {/* starting_point */}
          <FormField
            control={form.control}
            name="starting_point"
            render={({ field }) => (
              <FormItem className="xl:col-span-6 col-span-12">
                <FormLabel className="flex items-center gap-1">
                  <TbPentagonFilled size={16} className="text-main-purple" />
                  <p className="text-main-blue font-bold text-sm">
                    نقطة الانطلاق
                  </p>
                </FormLabel>
                <Select
                  dir="rtl"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                      <ChevronDown size={14} />
                    </div>} className={`bg-white  text-[#797979]  text-xs font-semibold border-none  rounded-full h-12`}>
                      <SelectValue placeholder={"إدخـــال نقطة الانطلاق من هنــا..."} className="text-[#797979]" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className=" shadow border-none rounded-xl bg-white">
                    {movingPoints?.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="cursor-pointer focus:bg-body rounded-xl">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500  text-xs " />
              </FormItem>
            )}
          />

          {/* people_count */}
          <FormField
            control={form.control}
            name="people_count"
            render={({ field }) => (
              <FormItem className="xl:col-span-6 col-span-12">
                <FormLabel className="flex items-center gap-1">
                  <FaUsers size={16} className="text-main-purple" />
                  <p className="text-main-blue font-bold text-sm">
                    عدد الأشخــــاص
                  </p>
                </FormLabel>
                <Select
                  dir="rtl"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                      <ChevronDown size={14} />
                    </div>} className={`bg-white  text-[#797979]  text-xs font-semibold border-none  rounded-full h-12`}>
                      <SelectValue placeholder={"إدخـــال عدد الاشخــاص من هنــا.."} className="text-[#797979]" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className=" shadow border-none rounded-xl bg-white">
                    {countOptions?.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="cursor-pointer focus:bg-body rounded-xl">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500  text-xs " />
              </FormItem>
            )}
          />
          {/* date */}
          <FormField
            control={form.control}
            name={"date"}
            render={({ field }) => (
              <FormItem className={`xl:col-span-6 col-span-12   flex flex-col`}>
                <FormLabel className="flex items-center gap-1">
                  <FaCalendarDays size={16} className="text-main-purple" />
                  <p className="text-main-blue font-bold text-sm">
                    التواريخ
                  </p>
                </FormLabel>
                <Popover className="w-full">
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "bg-white h-12 w-full px-3  font-xs font-semibold text-main-gray  rounded-full border-none hover:bg-body  flex items-center justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value && !isNaN(Date.parse(field.value)) ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span className="text-[#797979] text-xs font-semibold">مثل 22 / 05 / 2025. 10: 48 صباحا </span>
                        )}
                        <div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                          <ChevronDown size={14} />
                        </div>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 bg-white rounded-xl border-none shadow-md" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date?.toISOString() ?? "")}
                      className="w-full"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-red-500  text-xs " />
              </FormItem>
            )}
          />

        </div>
        {/* price icon */}
        <div className="bg-main-blue p-4 rounded-full flex items-center justify-between text-white text-xs font-bold ">
          <p>التكلفة {parseFloat(price - discount).toFixed(2)}ر.س</p>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.6875 7.5225C7.6875 7.9275 7.8 7.9875 8.055 8.0775L8.4375 8.2125V6.9375H8.2125C7.9275 6.9375 7.6875 7.2 7.6875 7.5225Z" fill="white" />
            <path d="M9.5625 11.0631H9.7875C10.08 11.0631 10.3125 10.8006 10.3125 10.4781C10.3125 10.0731 10.2 10.0131 9.945 9.92309L9.5625 9.78809V11.0631Z" fill="white" />
            <path d="M14.685 4.11L13.1475 5.6475C13.035 5.76 12.8925 5.8125 12.75 5.8125C12.6075 5.8125 12.465 5.76 12.3525 5.6475C12.135 5.43 12.135 5.07 12.3525 4.8525L13.89 3.315C12.57 2.19 10.8675 1.5 9 1.5C4.86 1.5 1.5 4.86 1.5 9C1.5 13.14 4.86 16.5 9 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 7.1325 15.81 5.43 14.685 4.11ZM10.3125 8.865C10.7925 9.0375 11.4375 9.3825 11.4375 10.485C11.4375 11.4225 10.695 12.195 9.7875 12.195H9.5625V12.3825C9.5625 12.69 9.3075 12.945 9 12.945C8.6925 12.945 8.4375 12.69 8.4375 12.3825V12.195H8.3775C7.38 12.195 6.5625 11.355 6.5625 10.32C6.5625 10.005 6.8175 9.75 7.125 9.75C7.4325 9.75 7.6875 10.005 7.6875 10.3125C7.6875 10.725 7.995 11.0625 8.3775 11.0625H8.4375V9.3975L7.6875 9.135C7.2075 8.9625 6.5625 8.6175 6.5625 7.515C6.5625 6.5775 7.305 5.805 8.2125 5.805H8.4375V5.625C8.4375 5.3175 8.6925 5.0625 9 5.0625C9.3075 5.0625 9.5625 5.3175 9.5625 5.625V5.8125H9.6225C10.62 5.8125 11.4375 6.6525 11.4375 7.6875C11.4375 7.995 11.1825 8.25 10.875 8.25C10.5675 8.25 10.3125 7.995 10.3125 7.6875C10.3125 7.275 10.005 6.9375 9.6225 6.9375H9.5625V8.6025L10.3125 8.865Z" fill="white" />
            <path d="M17.0175 1.2825C16.9575 1.1475 16.8525 1.035 16.71 0.975C16.6425 0.9525 16.575 0.9375 16.5 0.9375H13.5C13.1925 0.9375 12.9375 1.1925 12.9375 1.5C12.9375 1.8075 13.1925 2.0625 13.5 2.0625H15.1425L13.89 3.315C14.175 3.5625 14.4375 3.825 14.685 4.11L15.9375 2.8575V4.5C15.9375 4.8075 16.1925 5.0625 16.5 5.0625C16.8075 5.0625 17.0625 4.8075 17.0625 4.5V1.5C17.0625 1.425 17.0475 1.3575 17.0175 1.2825Z" fill="white" />
          </svg>

        </div>
        {/* arc */}
        <div className="flex items-center gap-2">
          <svg width="180" height="6" viewBox="0 0 230 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.333333 3C0.333333 4.47276 1.52724 5.66667 3 5.66667C4.47276 5.66667 5.66667 4.47276 5.66667 3C5.66667 1.52724 4.47276 0.333333 3 0.333333C1.52724 0.333333 0.333333 1.52724 0.333333 3ZM230 3.00002L230 2.50002L3 2.5L3 3L3 3.5L230 3.50002L230 3.00002Z" fill="url(#paint0_linear_324_4159)" />
            <defs>
              <linearGradient id="paint0_linear_324_4159" x1="3" y1="3.5" x2="230" y2="3.50002" gradientUnits="userSpaceOnUse">
                <stop />
                <stop offset="1" stop-color="white" />
              </linearGradient>
            </defs>
          </svg>
          <p className="flex-grow text-[10px] text-main-purple font-semibold text-center" >

            ستدفع الآن {parseFloat(price - discount).toFixed(2)} ريال
          </p>
          <svg width="180" height="6" viewBox="0 0 230 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M224.333 3.00002C224.333 4.47278 225.527 5.66669 227 5.66669C228.473 5.66669 229.667 4.47278 229.667 3.00002C229.667 1.52726 228.473 0.333353 227 0.333353C225.527 0.333353 224.333 1.52726 224.333 3.00002ZM227 3.00002L227 2.50002L4.37114e-08 2.5L0 3L-4.37114e-08 3.5L227 3.50002L227 3.00002Z" fill="url(#paint0_linear_324_4156)" />
            <defs>
              <linearGradient id="paint0_linear_324_4156" x1="-4.37114e-08" y1="3.5" x2="227" y2="3.50002" gradientUnits="userSpaceOnUse">
                <stop stop-color="white" />
                <stop offset="1" />
              </linearGradient>
            </defs>
          </svg>

        </div>
        {/* ditails */}
        <div className="bg-white p-6 rounded-[30px]">
          <ul className="space-y-7">
            <li className="text-xs font-bold flex items-center justify-between">
              <p className="text-main-blue">ليلة واحدة × {parseFloat(price - discount).toFixed(2)} ريال</p>
              <p>{parseFloat(price - discount).toFixed(2)} ريال</p>
            </li>
            <li className="text-xs font-bold flex items-center justify-between">
              <p className="text-main-blue">خصم من العروض</p>
              <p>-00.00 ريال</p>
            </li>
            <li className="text-xs font-bold flex items-center justify-between">
              <p className="text-main-blue">رسوم الخدمة</p>
              <p>+47.76 ريال</p>
            </li>
            <li className="h-[1px] bg-body"></li>
            <li className="text-xs font-bold flex items-center justify-between">
              <p className="text-main-blue">الإجمالي</p>
              <p>{(parseFloat(price - discount) + 47.76).toFixed(2)} ريال</p>
            </li>
          </ul>
        </div>
        {/* buttons */}
        <div className="space-y-3">
          <Button
            className="h-12 px-6 text-white  bg-main-blue hover:bg-main-purple transtion-all duration-300 w-full text-xs font-bold   rounded-full flex items-center justify-between  hover:text-white  ">
            حجز بواسطة واتساب
            <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.625 0.5C4.4375 0.5 0.25 4.6875 0.25 9.875C0.25 12 0.9375 14 2.25 15.625L0.9375 19.625C0.875 19.875 0.9375 20.125 1.125 20.3125C1.1875 20.4375 1.375 20.5 1.5 20.5C1.5625 20.5 1.6875 20.5 1.75 20.4375L6.0625 18.5C7.1875 19 8.375 19.25 9.625 19.25C14.8125 19.25 19 15.0625 19 9.875C19 4.6875 14.8125 0.5 9.625 0.5Z" fill="#25D366" />
              <path d="M15.0625 13.3125C14.8125 14.0625 13.875 14.6875 13.0625 14.8125C12.875 14.875 12.6875 14.875 12.4375 14.875C11.9375 14.875 11.1875 14.75 9.875 14.1875C8.375 13.5625 6.875 12.25 5.6875 10.5625V10.5C5.3125 9.9375 4.625 8.875 4.625 7.75C4.625 6.375 5.3125 5.6875 5.5625 5.375C5.875 5.0625 6.3125 4.875 6.8125 4.875C6.9375 4.875 7 4.875 7.125 4.875C7.5625 4.875 7.875 5 8.1875 5.625L8.4375 6.125C8.625 6.625 8.875 7.1875 8.9375 7.25C9.125 7.625 9.125 7.9375 8.9375 8.25C8.875 8.4375 8.75 8.5625 8.625 8.6875C8.5625 8.8125 8.5 8.875 8.4375 8.875C8.375 8.9375 8.375 8.9375 8.3125 9C8.5 9.3125 8.875 9.875 9.375 10.3125C10.125 11 10.6875 11.1875 11 11.3125C11.125 11.1875 11.25 10.9375 11.4375 10.75L11.5 10.625C11.8125 10.1875 12.3125 10.0625 12.8125 10.25C13.0625 10.375 14.4375 11 14.4375 11L14.5625 11.0625C14.75 11.1875 15 11.25 15.125 11.5C15.375 12.0625 15.1875 12.875 15.0625 13.3125Z" fill="white" />
            </svg>
          </Button>
          <Button
            type="submit"
            className="group h-12 px-6 text-white  bg-main-blue hover:bg-main-purple transtion-all duration-300 w-full text-xs font-bold   rounded-full flex items-center justify-between  hover:text-white  ">
            حجز عن طريق الموقع
            <FaLink
              size={20} className="text-white" />
          </Button>
        </div>


      </form>
    </Form>
  )
}

export default PriceForm
