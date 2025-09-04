import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import CustomFilterSelect from "./CustomFilterSelect"
import { useQuery } from "@tanstack/react-query"
import { fetchFromApi } from "../../../api/utils/fetchData"
import { useNavigate } from "react-router-dom"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRef } from "react";
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { ChevronDown } from "lucide-react"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import axios from "axios";
import { API_BASE_URL } from "../../../lib/apiConfig";
const HotelsForm = () => {
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [internalStartOpen, setInternalStartOpen] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);

  const t = { "flat": "شقق فندقية", "room": "غرفة", "hotel": "⁠فنادق بتوصية ســـي", "villa": "فلل وشاليهات ", "huts": "أكواخ خشبية", "hotel_suites": "أجنحة فندقية" }
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/all-filters`, {});
        setFilters(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error retrieving data:', error);
        setLoading(false);
        throw new Error('Could not get data');
      }
    };
    getData();
  }, []);
  // select

  const filterSelectFields = [
    {
      name: "type",
      label: "نــــوع السكن",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M9.82957 16.5H8.17042C5.58553 16.5 4.29307 16.5 3.41177 15.7412C2.53047 14.9823 2.34769 13.712 1.98213 11.1714L1.77305 9.71843C1.48847 7.7406 1.34618 6.75172 1.75153 5.90621C2.15687 5.0607 3.01964 4.54676 4.74518 3.51886L5.78381 2.90015C7.35078 1.96672 8.13427 1.5 9 1.5C9.86572 1.5 10.6493 1.96672 12.2162 2.90015L13.2548 3.51886C14.9803 4.54676 15.8432 5.0607 16.2484 5.90621C16.6538 6.75172 16.5115 7.7406 16.2269 9.71843L16.0179 11.1714C15.6523 13.712 15.4695 14.9823 14.5882 15.7412C13.7069 16.5 12.4144 16.5 9.82957 16.5ZM6.29818 11.6649C6.48317 11.4153 6.83546 11.363 7.08503 11.548C7.63132 11.9528 8.29065 12.1874 9.00007 12.1874C9.7095 12.1874 10.3688 11.9528 10.9151 11.548C11.1647 11.363 11.517 11.4153 11.7019 11.6649C11.887 11.9144 11.8346 12.2668 11.585 12.4517C10.8557 12.9923 9.96382 13.3124 9.00007 13.3124C8.03632 13.3124 7.14442 12.9923 6.41512 12.4517C6.16554 12.2668 6.11319 11.9144 6.29818 11.6649Z" fill="#A71755" />
        </svg>
      ),
      placeholder: "إدخـــال نوع السكـــن هنــا...",
      options: filters?.flats?.map((item) => ({ label: t[item] || item, value: item }))
    },
  ]
  //dates
  const datePickers = [
    {
      name: "startDate",
      label: "موعــــد القدوم",
      placeholder: "مثل 22 / 05 / 2025...",
      icon: (
        < svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
          <path d="M5.81238 1.875C5.81238 1.56434 5.56054 1.3125 5.24988 1.3125C4.93922 1.3125 4.68738 1.56434 4.68738 1.875V3.05944C3.60788 3.14588 2.89921 3.35803 2.37856 3.87868C1.85791 4.39933 1.64576 5.108 1.55933 6.1875H16.4404C16.354 5.108 16.1418 4.39933 15.6212 3.87868C15.1005 3.35803 14.3919 3.14588 13.3124 3.05944V1.875C13.3124 1.56434 13.0605 1.3125 12.7499 1.3125C12.4392 1.3125 12.1874 1.56434 12.1874 1.875V3.00967C11.6884 3 11.1291 3 10.4999 3H7.49988C6.87061 3 6.31133 3 5.81238 3.00967V1.875Z" fill="#A71755" />
          <path fillRule="evenodd" clipRule="evenodd" d="M1.5 9C1.5 8.37075 1.5 7.81148 1.50968 7.3125H16.4903C16.5 7.81148 16.5 8.37075 16.5 9V10.5C16.5 13.3284 16.5 14.7427 15.6213 15.6213C14.7427 16.5 13.3284 16.5 10.5 16.5H7.5C4.67157 16.5 3.25736 16.5 2.37868 15.6213C1.5 14.7427 1.5 13.3284 1.5 10.5V9ZM12.75 10.5C13.1642 10.5 13.5 10.1642 13.5 9.75C13.5 9.33577 13.1642 9 12.75 9C12.3358 9 12 9.33577 12 9.75C12 10.1642 12.3358 10.5 12.75 10.5ZM12.75 13.5C13.1642 13.5 13.5 13.1642 13.5 12.75C13.5 12.3358 13.1642 12 12.75 12C12.3358 12 12 12.3358 12 12.75C12 13.1642 12.3358 13.5 12.75 13.5ZM9.75 9.75C9.75 10.1642 9.41423 10.5 9 10.5C8.58578 10.5 8.25 10.1642 8.25 9.75C8.25 9.33577 8.58578 9 9 9C9.41423 9 9.75 9.33577 9.75 9.75ZM9.75 12.75C9.75 13.1642 9.41423 13.5 9 13.5C8.58578 13.5 8.25 13.1642 8.25 12.75C8.25 12.3358 8.58578 12 9 12C9.41423 12 9.75 12.3358 9.75 12.75ZM5.25 10.5C5.66421 10.5 6 10.1642 6 9.75C6 9.33577 5.66421 9 5.25 9C4.83579 9 4.5 9.33577 4.5 9.75C4.5 10.1642 4.83579 10.5 5.25 10.5ZM5.25 13.5C5.66421 13.5 6 13.1642 6 12.75C6 12.3358 5.66421 12 5.25 12C4.83579 12 4.5 12.3358 4.5 12.75C4.5 13.1642 4.83579 13.5 5.25 13.5Z" fill="#A71755" />
        </ svg>
      ),
    },
    {
      name: "endDate",
      label: "موعــــد المغــــادرة",
      placeholder: "مثل 22 / 05 / 2025...",
      icon: (
        < svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
          <path d="M5.81238 1.875C5.81238 1.56434 5.56054 1.3125 5.24988 1.3125C4.93922 1.3125 4.68738 1.56434 4.68738 1.875V3.05944C3.60788 3.14588 2.89921 3.35803 2.37856 3.87868C1.85791 4.39933 1.64576 5.108 1.55933 6.1875H16.4404C16.354 5.108 16.1418 4.39933 15.6212 3.87868C15.1005 3.35803 14.3919 3.14588 13.3124 3.05944V1.875C13.3124 1.56434 13.0605 1.3125 12.7499 1.3125C12.4392 1.3125 12.1874 1.56434 12.1874 1.875V3.00967C11.6884 3 11.1291 3 10.4999 3H7.49988C6.87061 3 6.31133 3 5.81238 3.00967V1.875Z" fill="#A71755" />
          <path fillRule="evenodd" clipRule="evenodd" d="M1.5 9C1.5 8.37075 1.5 7.81148 1.50968 7.3125H16.4903C16.5 7.81148 16.5 8.37075 16.5 9V10.5C16.5 13.3284 16.5 14.7427 15.6213 15.6213C14.7427 16.5 13.3284 16.5 10.5 16.5H7.5C4.67157 16.5 3.25736 16.5 2.37868 15.6213C1.5 14.7427 1.5 13.3284 1.5 10.5V9ZM12.75 10.5C13.1642 10.5 13.5 10.1642 13.5 9.75C13.5 9.33577 13.1642 9 12.75 9C12.3358 9 12 9.33577 12 9.75C12 10.1642 12.3358 10.5 12.75 10.5ZM12.75 13.5C13.1642 13.5 13.5 13.1642 13.5 12.75C13.5 12.3358 13.1642 12 12.75 12C12.3358 12 12 12.3358 12 12.75C12 13.1642 12.3358 13.5 12.75 13.5ZM9.75 9.75C9.75 10.1642 9.41423 10.5 9 10.5C8.58578 10.5 8.25 10.1642 8.25 9.75C8.25 9.33577 8.58578 9 9 9C9.41423 9 9.75 9.33577 9.75 9.75ZM9.75 12.75C9.75 13.1642 9.41423 13.5 9 13.5C8.58578 13.5 8.25 13.1642 8.25 12.75C8.25 12.3358 8.58578 12 9 12C9.41423 12 9.75 12.3358 9.75 12.75ZM5.25 10.5C5.66421 10.5 6 10.1642 6 9.75C6 9.33577 5.66421 9 5.25 9C4.83579 9 4.5 9.33577 4.5 9.75C4.5 10.1642 4.83579 10.5 5.25 10.5ZM5.25 13.5C5.66421 13.5 6 13.1642 6 12.75C6 12.3358 5.66421 12 5.25 12C4.83579 12 4.5 12.3358 4.5 12.75C4.5 13.1642 4.83579 13.5 5.25 13.5Z" fill="#A71755" />
        </ svg>
      ),
    },
  ]

  const formSchema = z.object({
    destination: z.string().nonempty("هذا الحقل مطلوب"),
    city: z.string().nonempty("هذا الحقل مطلوب"),
    type: z.string().nonempty("هذا الحقل مطلوب"),
    startDate: z.coerce.date({
      errorMap: () => ({ message: "يرجى إدخال تاريخ بداية صالح" }),
    }),
    endDate: z.coerce.date({
      errorMap: () => ({ message: "يرجى إدخال تاريخ نهاية صالح" }),
    }),
  })
    .refine((data) => data.endDate >= data.startDate, {
      path: ["endDate"],
      message: "يجب أن يكون تاريخ النهاية بعد أو يساوي تاريخ البداية",
    });

  const navigate = useNavigate()
  const { data } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await fetchFromApi("/countries");
      return res;
    }

  })
  // 1. Define your form.
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(today.getDate() + 3);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "",
      type: "",
      city: "",
      startDate: tomorrow,           // ✅ tomorrow
      endDate: "",       // ✅ 3 days from today
    },
  });
  const destination = form.watch("destination");
  const [cities, setCities] = useState([]);
  useEffect(() => {
    if (!destination) {
      setCities([]);
      return;
    }
    const selectedCountry = filters?.countries?.find((country) => String(country?.id) === String(destination));
    setCities(selectedCountry?.cities || []);
  }, [destination, filters]);
  // formate date
  function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = d.getFullYear();
    return `${month}-${day}-${year}`;
  }
  // 2. Define a submit handler.
  function onSubmit(values) {
    const formattedStartDate = formatDate(values.startDate);
    const formattedEndDate = formatDate(values.endDate);
    navigate(`/hotels?destination=${values.destination}&city=${values.city}&type=${values.type}&start=${formattedStartDate}&end=${formattedEndDate}`);
  }

  useEffect(() => {
    const subscription = form.watch((values, { name }) => {
      if (name === "startDate" && values.startDate) {
        // ✅ Delay to ensure calendar closes before opening the second
        setTimeout(() => {
          setOpenEndDate(true);
        }, 150); // 100–200ms is ideal

      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const startDate = form.watch("startDate"); // 👈 get startDate


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-10 gap-x-4 xl:gap-y-6 gap-y-4">
        <FormField
          control={form.control}
          name={"destination"}
          render={({ field }) => (
            <FormItem className={"xl:col-span-2 md:col-span-5 col-span-10"}>
              <FormLabel className="flex items-center gap-1">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.89567 2.2193L12.6681 4.4693C17.2206 5.9918 17.2206 8.47432 12.6681 9.98932L10.6581 10.6568L9.99067 12.6668C8.47567 17.2193 5.98567 17.2193 4.47067 12.6668L2.21317 5.9018C1.20817 2.8643 2.85817 1.2068 5.89567 2.2193ZM5.65567 6.2543L8.50567 9.11932C8.61817 9.23182 8.76067 9.28432 8.90317 9.28432C9.04567 9.28432 9.18817 9.23182 9.30067 9.11932C9.51817 8.90182 9.51817 8.54182 9.30067 8.32432L6.45067 5.4593C6.23317 5.2418 5.87317 5.2418 5.65567 5.4593C5.43817 5.6768 5.43817 6.0368 5.65567 6.2543Z" fill="#A71755" />
                </svg>
                <p className="text-main-blue font-bold text-sm">
                  إختــــــر الوجهـــة
                </p>
              </FormLabel>
              <Select dir="rtl" onValueChange={field.onChange} value={field.value} defaultValue={field.value} >
                <FormControl>
                  <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                    <ChevronDown size={14} />
                  </div>} className={` bg-body text-[#797979]  text-xs font-semibold border-none  rounded-full h-12`}>
                    <SelectValue placeholder={"إدخـــال الوجهة هنــا.."} className="text-[#797979]" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className=" shadow border-none rounded-xl bg-white  ">
                  {filters?.countries?.map((option) => (
                    <SelectItem key={option?.id} value={String(option.id)} className=" cursor-pointer focus:bg-body rounded-xl">
                      {option.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500  text-xs " />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"city"}
          render={({ field }) => (
            <FormItem className={"xl:col-span-2 md:col-span-5 col-span-10"}>
              <FormLabel className="flex items-center gap-1">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.89567 2.2193L12.6681 4.4693C17.2206 5.9918 17.2206 8.47432 12.6681 9.98932L10.6581 10.6568L9.99067 12.6668C8.47567 17.2193 5.98567 17.2193 4.47067 12.6668L2.21317 5.9018C1.20817 2.8643 2.85817 1.2068 5.89567 2.2193ZM5.65567 6.2543L8.50567 9.11932C8.61817 9.23182 8.76067 9.28432 8.90317 9.28432C9.04567 9.28432 9.18817 9.23182 9.30067 9.11932C9.51817 8.90182 9.51817 8.54182 9.30067 8.32432L6.45067 5.4593C6.23317 5.2418 5.87317 5.2418 5.65567 5.4593C5.43817 5.6768 5.43817 6.0368 5.65567 6.2543Z" fill="#A71755" />
                </svg>
                <p className="text-main-blue font-bold text-sm">إختــــــر المديــنة</p>
              </FormLabel>

              <Select
                dir="rtl"
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
                disabled={!destination} // ✅ Disable if no destination selected
              >
                <FormControl>
                  <SelectTrigger
                    icon={<div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                      <ChevronDown size={14} />
                    </div>}
                    className={`bg-body text-[#797979] text-xs font-semibold border-none rounded-full h-12 ${!destination ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <SelectValue placeholder={"إدخـــال المدينة هنــا.."} />
                  </SelectTrigger>
                </FormControl>

                <SelectContent className="shadow border-none rounded-xl bg-white">
                  {cities.map((option) => (
                    <SelectItem key={option.id} value={String(option.id)} className="cursor-pointer focus:bg-body rounded-xl">
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />


        {filterSelectFields.map((fieldProps, index) => (
          <CustomFilterSelect key={index} {...fieldProps} form={form} />
        ))}

        {/* Start Date Calendar */}
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="xl:col-span-2 md:col-span-5 col-span-10 flex flex-col">
              <FormLabel className="flex items-center gap-1">
                {datePickers[0].icon}
                <p className="text-main-blue font-bold text-sm">{datePickers[0].label}</p>
              </FormLabel>

              <Popover open={internalStartOpen} onOpenChange={setInternalStartOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className="h-12 w-full px-3 font-xs font-semibold text-main-gray rounded-full border-none hover:bg-body flex items-center justify-between bg-body"
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span className="text-[#797979] text-xs font-semibold">
                          {datePickers[0].placeholder}
                        </span>
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
                    onSelect={(val) => {
                      field.onChange(val);
                      setInternalStartOpen(false); // ✅ close start calendar

                      setTimeout(() => {
                        setOpenEndDate(true);       // ✅ reliably open end calendar
                      }, 200);
                    }}
                    fromDate={new Date()}
                    className="w-full"
                  />
                </PopoverContent>
              </Popover>

              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />

        {/* End Date Calendar */}
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="xl:col-span-2 md:col-span-5 col-span-10 flex flex-col">
              <FormLabel className="flex items-center gap-1">
                {datePickers[1].icon}
                <p className="text-main-blue font-bold text-sm">{datePickers[1].label}</p>
              </FormLabel>

              <Popover open={openEndDate} onOpenChange={setOpenEndDate}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      disabled={!startDate} // ✅ disable if no startDate
                      className={`h-12 w-full px-3 font-xs font-semibold text-main-gray rounded-full border-none hover:bg-body flex items-center justify-between bg-body ${!startDate ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span className="text-[#797979] text-xs font-semibold">
                          {datePickers[1].placeholder}
                        </span>
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
                    selected={field.value}
                    onSelect={(val) => {
                      field.onChange(val);
                      setOpenEndDate(false);
                    }}
                    fromDate={startDate || new Date()} // ✅ limit to startDate onward
                    className="w-full"
                  />
                </PopoverContent>
              </Popover>

              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />
        <Button type="submit" className="xl:col-span-10 md:col-span-5 col-span-10 bg-main-purple w-fit m-auto text-white  hover:bg-main-blue transition-all duration-300  rounded-full flex items-center gap-14">بحـــــث
          <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_22_399)">
              <path d="M10.5 3.75H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10.5 6H12.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.75 8.625C15.75 12.5625 12.5625 15.75 8.625 15.75C4.6875 15.75 1.5 12.5625 1.5 8.625C1.5 4.6875 4.6875 1.5 8.625 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16.5 16.5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
              <clipPath id="clip0_22_399">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>

        </Button>
      </form>
    </Form >
  )
}

export default HotelsForm
