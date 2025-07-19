import axios from "axios";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { FaArrowsLeftRight } from "react-icons/fa6";
import { ChevronDown } from "lucide-react"
import { countries } from "../../data/visa"
import { cn } from "@/lib/utils"
import { format } from "date-fns";
import { BsFillSendFill } from "react-icons/bs";
import { FaCalendarDays } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";
import { IoLanguage } from "react-icons/io5";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { AiFillDollarCircle } from "react-icons/ai";
import { MdStarRate } from "react-icons/md";
import { API_BASE_URL } from "../../lib/apiConfig";
import Loading from "../loading/Loading";
const countOptions = Array.from({ length: 10 }, (_, i) => {
  const num = (i + 1).toString();
  return { label: num, value: num };
});

// schema
export const filterSchema = z.object({
  start: z.string().optional(),
  end: z.string().optional(),
  date: z.string().refine((val) => !val || !isNaN(Date.parse(val)), { message: "Invalid date", }).optional(),
  lang: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  model: z.string().optional(),
  type: z.string().optional(),
});

const FilterPanel = ({ defaultValues, onFilter, setMainData,setLoading }) => {
  function formatDate(input) {
    const date = new Date(input);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const [seletedCountry, setSelectedCountry] = useState(defaultValues.destination || '');
  const [selectedFlat, setSelectedFlat] = useState(defaultValues.flat || '');
  const [selectedCity, setSelectedCity] = useState(defaultValues.city || '');
  const [seletedNeighborhood, setSelectedNeighborhood] = useState(defaultValues.neighborhood || '');
  const [seletedRate, setSelectedRate] = useState(defaultValues.rate || '');
  const [selectedOffer, setSelectedOffer] = useState(defaultValues.offer || '');
  const [selectedDate, setSelectedDate] = useState(defaultValues.start || '');
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [cities, setCities] = useState([])
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/countries`, {});
        const response2 = await axios.get(`${API_BASE_URL}/cities`, {});
        const response3 = await axios.get(`${API_BASE_URL}/all-filters`, {});
        setData(response.data.data);
        setCities(response2.data.data);
        setFilters(response3.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error retrieving data:', error);
        setLoading(false);
        throw new Error('Could not get data');
      }
    };
    getData();
  }, []);
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const response = await axios.post(`${API_BASE_URL}/filter-hotels?countery_id=${seletedCountry}&available_from=${formatDate(selectedDate)}&city_id=${selectedCity}&type=${selectedFlat}&neighborhood=${seletedNeighborhood}&rating=${seletedRate}`, {});
        setMainData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error retrieving data:', error);
        setLoading(false);
        throw new Error('Could not get data');
      }
    };
    getData();
  }, [seletedCountry, selectedCity, selectedDate, selectedFlat, seletedNeighborhood, seletedRate, selectedOffer]);
  const form = useForm({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      start: defaultValues.destination || '',
      end: defaultValues.city || '',
      date: defaultValues.start || '',
      lang: defaultValues.flat || '',
      country: defaultValues.neighborhood || '',
      rating: defaultValues.rate || '',
      model: defaultValues.offer || '',
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.setValue("start", defaultValues.destination || '');
      form.setValue("end", defaultValues.city || '');
      form.setValue("date", defaultValues.start || '');
      form.setValue("lang", defaultValues.flat || '');
      form.setValue("country", defaultValues.neighborhood || '');
      form.setValue("rating", defaultValues.rate || '');
      form.setValue("model", defaultValues.offer || '');
    }
  }, [defaultValues]);
  
  const { watch, setValue } = form;
  const values = watch();
  const t ={
    "flat" :"شقة",
    "room":"غرفة",
    "hotel":"فندق"
  }
  function clearFilter() {
    setValue("start", "");
    setValue("end", "");
    setValue("date", "");
    setValue("lang", "");
    setValue("country", "");
    setValue("rating", "");
    setValue("model", "");
    setSelectedCountry('');
    setSelectedFlat('');
    setSelectedCity('');
    setSelectedNeighborhood('');
    setSelectedRate('');
    setSelectedOffer('');
    setSelectedDate('');
  }
  
  return (
    
          <Form {...form}>
            <form className="space-y-4 mb-10">
              <div className="flex gap-4 xl:flex-nowrap flex-wrap">
                {/* start */}
                <FormField
                  control={form.control}
                  name={"start"}
                  className="w-full "
                  render={() => (
                    <FormItem className="xl:col-span-3 col-span-12 w-full">
                      <FormLabel className="flex items-center gap-1">
                        <BsFillSendFill size={16} className="text-main-purple" />
                        <p className="text-main-blue font-bold text-sm">
                          إختــــــر الوجهـــة
                        </p>
                      </FormLabel>
                      <Select dir="rtl"
                        defaultValue={String(values.destination||"")}
                        onValueChange={(val) => setSelectedCountry(val)} >
                        <FormControl>
                          <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                            <ChevronDown size={14} />
                          </div>} className={`bg-body  text-[#797979]  text-xs font-semibold border-none  rounded-full h-12`}>
                            <SelectValue placeholder={"إدخـــال نقطة الانطلاق من هنــا..."} className="text-[#797979]" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className=" shadow border-none rounded-xl bg-white  ">
                          {data.map((option) => (
                            <SelectItem key={option.id} value={String(option.id)} className=" cursor-pointer focus:bg-body rounded-xl">
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                {/* end */}
                <FormField
                  className="w-full "
                  control={form.control}
                  name={"end"}
                  render={() => (
                    <FormItem className="xl:col-span-3 col-span-12 w-full ">
                      <FormLabel className="flex items-center gap-1">
                        <BsFillSendFill size={16} className="text-main-purple" />
                        <p className="text-main-blue font-bold text-sm">
                          إختــــــر المديــنة
                        </p>
                      </FormLabel>
                      <Select dir="rtl"
                        defaultValue={selectedCity}
                        onValueChange={(val) => setSelectedCity(val)} >
                        <FormControl>
                          <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                            <ChevronDown size={14} />
                          </div>} className={`bg-body  text-[#797979]  text-xs font-semibold border-none  rounded-full h-12`}>
                            <SelectValue placeholder={"إدخـــال نقطة الانطلاق من هنــا..."} className="text-[#797979]" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className=" shadow border-none rounded-xl bg-white  ">
                          {cities.map((option) => (
                            <SelectItem key={option.name} value={String(option.id)} className=" cursor-pointer focus:bg-body rounded-xl">
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                {/* number */}
                {/* date */}
                <FormField
                  control={form.control}
                  name={"date"}
                  className="w-full "
                  render={({ field }) => (
                    <FormItem className={`xl:col-span-3 col-span-12  w-full flex flex-col`}>
                      <FormLabel className="flex items-center gap-1">
                        <FaCalendarDays size={16} className="text-main-purple" />
                        <p className="text-main-blue font-bold text-sm">
                          موعـــد الوصول / العودة
                        </p>
                      </FormLabel>
                      <Popover className="w-full">
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "bg-body h-12 w-full px-3  font-xs font-semibold text-main-gray  rounded-full border-none hover:bg-body  flex items-center justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
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
                            // onChange={field.onChange}
                            onSelect={(date) => setSelectedDate(date)}
                            className="w-full"
                          // fromDate={new Date()} // ⬅️ This prevents selecting past dates
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="text-red-500  text-xs " />
                    </FormItem>
                  )}
                />
                <button 
                className="flex-shrink-0 xl:col-span-2 col-span-12 h-12 py-0 px-9 mt-7 bg-[#A71755]  text-white hover:text-red-500  font-semibold flex items-center justify-center rounded-full"
                onClick={clearFilter}
                >مسح الفلترة</button>
              </div>
              <div className="grid grid-cols-6 gap-4">
                {/* lang */}
                <FormField
                  control={form.control}
                  name={"lang"}
                  render={() => (
                    <FormItem className="xl:col-span-2 col-span-12">
                      <Select dir="rtl"
                        defaultValue={values.lang}
                        onValueChange={(val) => setSelectedFlat(val)} >
                        <FormControl>
                          <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white ">
                            <ChevronDown size={14} />
                          </div>}
                            className={`bg-main-navy  text-white text-xs font-semibold border-none  rounded-full h-12`}>
                            <SelectValue placeholder={
                              <div className=" text-white flex items-center gap-1">
                                <IoLanguage size={16} />
                                <p >نوع السكن </p>
                              </div>} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className=" shadow border-none rounded-xl bg-white  ">
                          {filters?.flats?.map((option) => (
                            <SelectItem key={option} value={option} className=" cursor-pointer focus:bg-body rounded-xl">
                              {t[option]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                {/* country */}
                <FormField
                  control={form.control}
                  name={"country"}
                  render={() => (
                    <FormItem className="xl:col-span-2 col-span-12">
                      <Select dir="rtl"
                        defaultValue={values.country}
                        onValueChange={(val) => setSelectedNeighborhood(val)} >
                        <FormControl>
                          <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white ">
                            <ChevronDown size={14} />
                          </div>}
                            className={`bg-main-navy  text-white text-xs font-semibold border-none  rounded-full h-12`}>
                            <SelectValue placeholder={
                              <div className=" text-white flex items-center gap-1">
                                <FaArrowsLeftRight size={16} />
                                <p >الحي</p>
                              </div>} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className=" shadow border-none rounded-xl bg-white  ">
                          {filters?.neighborhood?.map((option) => (
                            option ?
                              <SelectItem key={option} value={option} className=" cursor-pointer focus:bg-body rounded-xl">
                                {option}
                              </SelectItem> : null

                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                {/* offers */}
                {/* <FormField
                  control={form.control}
                  name={"offers"}
                  render={() => (
                    <FormItem className="xl:col-span-2 col-span-12">
                      <Select dir="rtl"
                        defaultValue={values.model}
                        onValueChange={(val) => setSelectedOffer( val)} >
                        <FormControl>
                          <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white ">
                            <ChevronDown size={14} />
                          </div>}
                            className={`bg-main-navy  text-white text-xs font-semibold border-none  rounded-full h-12`}>
                            <SelectValue placeholder={
                              <div className=" text-white flex items-center gap-1">
                                <BiSolidOffer size={16} />
                                <p >العروض</p>
                              </div>} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className=" shadow border-none rounded-xl bg-white  ">
                          {filters?.offers?.map((option, index) => (
                            <SelectItem key={index} value={option} className=" cursor-pointer focus:bg-body rounded-xl">
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                /> */}
                {/* tating */}
                <FormField
                  control={form.control}
                  name={"rating"}
                  render={() => (
                    <FormItem className="xl:col-span-2 col-span-12">
                      <Select dir="rtl"
                        defaultValue={values.type}
                        onValueChange={(val) => setSelectedRate(val)} >
                        <FormControl>
                          <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white ">
                            <ChevronDown size={14} />
                          </div>}
                            className={`bg-main-navy  text-white text-xs font-semibold border-none  rounded-full h-12`}>
                            <SelectValue placeholder={
                              <div className=" text-white flex items-center gap-1">
                                <MdStarRate size={16} />
                                <p >التقييم</p>
                              </div>} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className=" shadow border-none rounded-xl bg-white  ">
                          {filters?.rating?.map((option) => (
                            <SelectItem key={option} value={option.toString()} className=" cursor-pointer focus:bg-body rounded-xl">
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

            </form>
          </Form>
     
  )
}

export default FilterPanel
