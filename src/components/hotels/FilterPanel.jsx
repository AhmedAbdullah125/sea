import axios from "axios";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FaCalendarDays } from "react-icons/fa6";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { MdPlace } from "react-icons/md";
import { format, set } from "date-fns";
import { HiMiniViewfinderCircle } from "react-icons/hi2";
import { MdStarRate } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { API_BASE_URL } from "../../lib/apiConfig";
import { motion } from "framer-motion";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "../loading/Loading";

// Zod schema
export const filterSchema = z.object({
  start: z.string().optional(),
  end: z.string().optional(),
  date: z.string().refine((val) => !val || !isNaN(Date.parse(val)), { message: "Invalid date" }).optional(),
  dateTo: z.string().refine((val) => !val || !isNaN(Date.parse(val)), { message: "Invalid date" }).optional(),
  lang: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  model: z.string().optional(),
  type: z.string().optional(),
  views: z.string().optional(),   // <- add this
});

// Utility: Normalize to YYYY-MM-DD format
function formatDate(input) {
  if (!input) return "";
  const date = new Date(input);
  if (isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Utility: parse date safely (e.g., "08-25-2025" → "2025-08-25")
function safeDateParse(input) {
  if (!input) return undefined;
  if (/^\d{2}-\d{2}-\d{4}$/.test(input)) {
    const [month, day, year] = input.split("-");
    return new Date(`${year}-${month}-${day}`);
  }
  return new Date(input);
}
const FilterPanel = ({ mainData, setIsFilterOpen, defaultValues, setMainData, setLoading, page, mainSelectedCity , setMainSelectedCity }) => {
  console.log(mainSelectedCity)
  const [seletedCountry, setSelectedCountry] = useState(String(defaultValues.destination) || '');
  const [selectedFlat, setSelectedFlat] = useState(defaultValues.flat || '');
  const [selectedCity, setSelectedCity] = useState(defaultValues.city || '');
  const [seletedNeighborhood, setSelectedNeighborhood] = useState(defaultValues.neighborhood || '');
  const [seletedRate, setSelectedRate] = useState(defaultValues.rate || '');
  const [selectedOffer, setSelectedOffer] = useState(defaultValues.offer || '');
  const [selectedDate, setSelectedDate] = useState(defaultValues.start || '');
  const [selectedDateTo, setSelectedDateTo] = useState(defaultValues.end || '');
  const [selectedPlace, setSelectedPlace] = useState('');
  const [selectedView, setSelectedView] = useState('');
  const [data, setData] = useState([]);
  const [views, setViews] = useState([]);
  const [places, setPlaces] = useState([]);
  const [keyWord, setKeyWord] = useState('');
  const [selectedCountryCities, setSelectedCountryCities] = useState([])
  const [localLoading, setLocalLoading] = useState(false);
  console.log(mainData)
  if (seletedCountry || selectedFlat || mainSelectedCity || selectedCity || seletedNeighborhood || seletedRate || selectedOffer || selectedDate || selectedDateTo || selectedPlace || selectedView || keyWord) {
    setIsFilterOpen(true)
  }
  else {
    setIsFilterOpen(false)
  }
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/all-filters`);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error retrieving data:', error);
        setLoading(false);
      }
    };
    getData();
  }, []);
  useEffect(() => {
    const getHotels = async () => {
      setLoading(true);
      setLocalLoading(true);
      try {
        const query = `
        ${API_BASE_URL}/filter-hotels?page=${page}&country_id=${seletedCountry}` +
          `${selectedDate ? `&available_from=${formatDate(selectedDate)}` : ""}` +
          `${selectedDateTo ? `&available_to=${formatDate(selectedDateTo)}` : ""}` +
          `${selectedPlace ? `&place_id=${selectedPlace}` : ""}` +
          `${selectedView ? `&view_id=${selectedView}` : ""}` +
          `${keyWord ? `&name=${keyWord}` : ""}` +
          `&offer=${selectedOffer}&city_id=${selectedCity ? selectedCity : mainSelectedCity ? mainSelectedCity : ""}&type=${selectedFlat}&neighborhood=${seletedNeighborhood}&rate_id=${seletedRate}`;
        const response = await axios.get(query);
        setMainData(response.data);
        if (response?.data?.data?.length > 0) {
          const newViews = [];
          const newPlaces = [];
          for (let i = 0; i < response?.data?.data?.length; i++) {
            if (!newViews.some((view) => view.id === response?.data?.data[i]?.view_id) && response?.data?.data[i]?.view_name) {
              newViews.push({ id: response?.data?.data[i]?.view_id, name: response?.data?.data[i]?.view_name });
            }
            if (!newPlaces.some((palce) => palce.id === response?.data?.data[i]?.place_id) && response?.data?.data[i]?.place_name) {
              newPlaces.push({ id: response?.data?.data[i]?.place_id, name: response?.data?.data[i]?.place_name });
            }

          }
          setViews(newViews);
          setPlaces(newPlaces);
          console.log(newViews)
        }
      } catch (error) {
        console.error('Error retrieving hotels:', error);
      }
      setLoading(false);
      setLocalLoading(false);
    };
    getHotels();
  }, [page, keyWord, seletedCountry, mainSelectedCity, selectedCity, selectedDate, selectedFlat, seletedNeighborhood, seletedRate, selectedOffer, selectedDateTo, selectedPlace, selectedView]);
  console.log(places)
  const form = useForm({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      start: String(defaultValues.destination || ""),
      end: String(defaultValues.city || ""),
      date: defaultValues.start || "",
      dateTo: defaultValues.end || "",
      lang: String(defaultValues.flat || ""),
      country: String(defaultValues.neighborhood || ""),
      rating: String(defaultValues.rate || ""),
      model: String(defaultValues.offer || ""),
      views: String(defaultValues.view || ""),
      places: String(defaultValues.place || ""),
    },
  });


  const { setValue } = form;
  const t = { "flat": "شقق فندقية", "room": "غرفة", "hotel": "⁠فنادق بتوصية ســـي", "villa": "فلل وشاليهات ", "huts": "أكواخ خشبية", "hotel_suites": "أجنحة فندقية" }
  function clearFilter() {
    form.reset({
      start: "",
      end: "",
      date: "",
      dateTo: "",
      lang: "",
      country: "",
      rating: "",
      model: "",
      views: "",
      places: "",
      
    });

    setKeyWord("");
    setSelectedCountry("");
    setSelectedFlat("");
    setSelectedCity("");
    setSelectedNeighborhood("");
    setSelectedRate("");
    setSelectedOffer("");
    setSelectedDate("");
    setSelectedDateTo("");
    setSelectedPlace("");
    setSelectedView("");
    setMainSelectedCity("");
  }
  useEffect(() => {
    const selectedCountryCites = data?.countries?.filter((country) => country.id === Number(seletedCountry))[0]?.cities;
    setSelectedCountryCities(selectedCountryCites);
    console.log(selectedCountryCites)
  }, [seletedCountry])
  console.log(mainData?.data)

  return (
    <Form {...form}>
      <motion.form
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="space-y-4 mb-10">
        <div className="flex gap-4 xl:flex-nowrap flex-wrap items-end">
          {/* start */}
          <FormField
            control={form.control}
            name={"start"}
            className="w-full "
            render={({ field }) => (
              <FormItem className="xl:col-span-3 col-span-12 w-full">
                <FormLabel className="flex items-center gap-1">
                  <BsFillSendFill size={16} className="text-main-purple" />
                  <p className="text-main-blue font-bold text-sm">
                    اختــــــر الوجهـــة
                  </p>
                </FormLabel>
                <Select
                  dir="rtl"
                  value={field.value ?? ""}                   // <-- controlled
                  onValueChange={(val) => {
                    field.onChange(val);                      // update RHF
                    setSelectedCountry(val);                  // your local side-effect
                  }}
                >
                  <FormControl>
                    <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                      <ChevronDown size={14} />
                    </div>} className={`bg-body  text-[#797979]  text-xs font-semibold border-none  rounded-full h-12`}>
                      <SelectValue placeholder={"إدخـــال نقطة الانطلاق من هنــا..."} className="text-[#797979]" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className=" shadow border-none rounded-xl bg-white  ">
                    {data?.countries?.map((option) => (
                      <SelectItem key={option.id} value={String(option.id)} className=" cursor-pointer focus:bg-body rounded-xl">
                        {option.country}
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
            render={({ field }) => (
              <FormItem className="xl:col-span-3 col-span-12 w-full ">
                <FormLabel className="flex items-center gap-1">
                  <BsFillSendFill size={16} className="text-main-purple" />
                  <p className="text-main-blue font-bold text-sm">
                    اختــــــر المديــنة
                  </p>
                </FormLabel>
                <Select dir="rtl"
                  value={field.value ?? ""}
                  onValueChange={(val) => {
                    field.onChange(val);                      // update RHF
                    setSelectedCity(val);                  // your local side-effect
                  }}
                  disabled={!seletedCountry}
                >
                  <FormControl>
                    <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                      <ChevronDown size={14} />
                    </div>} className={`bg-body  text-[#797979]  text-xs font-semibold border-none  rounded-full h-12`}>
                      <SelectValue placeholder={"إدخـــال نقطة الانطلاق من هنــا..."} className="text-[#797979]" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className=" shadow border-none rounded-xl bg-white  ">
                    {selectedCountryCities?.map((option) => (
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
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center gap-1">
                  <FaCalendarDays size={16} className="text-main-purple" />
                  <p className="text-main-blue font-bold text-sm">موعـــد الوصول </p>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" className="bg-body rounded-full h-12 w-full flex justify-between">
                        {selectedDate ? format(safeDateParse(selectedDate), "PPP") :
                          field.value ? format(safeDateParse(field.value), "PPP") :
                            <span className="text-[#797979] text-xs font-semibold">اختر تاريخ الوصول</span>}
                        <ChevronDown size={14} />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 bg-white rounded-xl border-none shadow-md" align="start">
                    <Calendar
                      mode="single"
                      selected={safeDateParse(selectedDate)}
                      onSelect={(date) => setSelectedDate(date)}
                      fromDate={new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"dateTo"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center gap-1">
                  <FaCalendarDays size={16} className="text-main-purple" />
                  <p className="text-main-blue font-bold text-sm">موعـــد العودة</p>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "bg-body h-12 w-full px-3  font-xs font-semibold text-main-gray  rounded-full border-none hover:bg-body  flex items-center justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {selectedDateTo ? format(safeDateParse(selectedDateTo), "PPP") :
                          field.value ? format(safeDateParse(field.value), "PPP") :
                            <span className="text-[#797979] text-xs font-semibold">اختر تاريخ العودة</span>}
                        <ChevronDown size={14} />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 bg-white rounded-xl border-none shadow-md" align="start">
                    <Calendar
                      mode="single"
                      selected={safeDateParse(selectedDateTo || field.value)}
                      onSelect={(date) => setSelectedDateTo(date)}
                      fromDate={new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <div className="important-dir-rtl">
            <AlertDialog >
              <AlertDialogTrigger asChild>
                <div className="search-icon h-12 w-12 flex items-center justify-center text-white bg-main-navy/90 rounded-full shrink-0">
                  <i className="fa-solid fa-magnifying-glass "></i>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white rounded-xl border-none shadow-md items-center max-w-[500px]">
                <AlertDialogHeader>
                  {/* icon to close */}
                  <div className="absolute top-2 right-2 cursor-pointer"
                    onClick={() => {
                      document.getElementById("ccccccc").click();
                    }}
                  ><i className="fa-solid fa-xmark"></i></div>
                  <AlertDialogTitle className="text-[#A71755] font-semibold direction-rtl">ابحث الان عن فنـــدقك المفـــضل</AlertDialogTitle>
                  <AlertDialogDescription>
                    <div className="w-full flex flex-col items-center gap-3">
                      <div className="input-contt w-full relative">
                        <input type="text" placeholder="ابحث الان عن فنـــدقك المفـــضل" id="searchInputt" className="w-full h-12 px-9 py-2 text-[#797979] text-xs font-semibold border-none rounded-full placeholder:text-[#797979] bg-body"
                          //if enter submit
                          onKeyUp={(e) => {
                            // if (e.key === "Enter") {
                            setKeyWord(document.getElementById("searchInputt").value);
                            // }
                          }}
                        />
                        {
                          keyWord.length > 0 &&
                          <div className="absolute top-14 right-0 flex flex-col items-start w-full  gap-2 px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-200 rounded-3xl">
                            {
                              localLoading ? <Loading /> :
                                <div className="w-full flex flex-col gap-2 max-h-64 overflow-y-scroll">
                                  {
                                    mainData?.data?.length > 0 && keyWord.length > 0 ?
                                      mainData?.data?.slice(0, 5).map((hotel) => {
                                        return (
                                          <Link
                                            to={`/hotel/${hotel.slug}`}
                                            className="flex items-center gap-2 justify-between hover:bg-white rounded-xl px-3 py-2"
                                            onClick={() => {
                                              setKeyWord(hotel.title);
                                              document.getElementById("searchInputt").value = hotel.title;
                                              document.getElementById("ccccccc").click();
                                            }}
                                          >
                                            <div className="r-side">
                                              <LazyLoadImage src={hotel.main_image} alt="Sea" className="w-12 h-12 object-cover rounded-xl" />
                                            </div>
                                            <div className="h-full flex flex-col justify-between items-end">
                                              <span className="text-xl text-main-navy text-end max-w-60">{hotel.title}</span>
                                              <span className="text-primaryColor text-sm">{hotel.place_name}</span>
                                            </div>
                                          </Link>
                                        )
                                      })
                                      :
                                      <p className="text-center text-xs font-semibold text-gray-500">لا يوجد نتائج</p>
                                  }
                                  {
                                    mainData?.data?.length > 5 && keyWord.length > 0 &&
                                    <button type="submit" onClick={() => {
                                      setKeyWord(document.getElementById("searchInputt").value);

                                      //exit alert
                                      document.getElementById("ccccccc").click();
                                    }}
                                      className="flex-shrink-0 h-12 py-0 px-9 mt-7 bg-[#A71755] text-white font-semibold rounded-full"> اظهار المزيد
                                    </button>
                                  }

                                </div>
                            }
                          </div>
                        }
                      </div>
                      <button type="submit" onClick={() => {
                        setKeyWord(document.getElementById("searchInputt").value);
                        document.getElementById("searchInputt").value = "";
                        //exit alert
                        document.getElementById("ccccccc").click();
                      }}
                        className="flex-shrink-0 h-12 py-0 px-9 mt-7 bg-[#A71755] text-white font-semibold rounded-full"> بحث
                      </button>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel id="ccccccc" className="hidden">إلغاء</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div className="flex gap-4 xl:flex-nowrap flex-wrap">
          {/* rate */}
          <FormField
            control={form.control}
            name={"rate"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center gap-1">
                  <MdStarRate size={16} className="text-main-purple" />
                  <p className="text-main-blue font-bold text-sm">فئة النجوم</p>
                </FormLabel>
                <Select dir="rtl"
                  value={field.value || ""}
                  onValueChange={(val) => {
                    field.onChange(val);
                    setSelectedRate(val);
                  }} >
                  <FormControl>
                    <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                      <ChevronDown size={14} />
                    </div>} className={`bg-body  text-[#797979]  text-xs font-semibold border-none  rounded-full h-12`}>
                      <SelectValue placeholder={"اختر التقييم..."} className="text-[#797979]" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className=" shadow border-none rounded-xl bg-white  ">
                    {data?.rating?.map((option) => (
                      <SelectItem key={option.id} value={String(option.id)} className=" cursor-pointer focus:bg-body rounded-xl">
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"places"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center gap-1">
                  <MdPlace size={16} className="text-main-purple" />
                  <p className="text-main-blue font-bold text-sm">المكان</p>
                </FormLabel>
                <Select dir="rtl"
                  value={field.value}
                  onValueChange={(val) => {
                    field.onChange(val);
                    setSelectedPlace(val);
                  }} >
                  <FormControl>
                    <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                      <ChevronDown size={14} />
                    </div>} className={`bg-body  text-[#797979]  text-xs font-semibold border-none  rounded-full h-12`}>
                      <SelectValue placeholder={"اختر المكان..."} className="text-[#797979]" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className=" shadow border-none rounded-xl bg-white  ">
                    {places?.map((option) => (
                      <SelectItem key={option.id} value={String(option.id)} className=" cursor-pointer focus:bg-body rounded-xl">
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="views"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center gap-1">
                  <HiMiniViewfinderCircle size={16} className="text-main-purple" />
                  <p className="text-main-blue font-bold text-sm">نوع الإطلالة</p>
                </FormLabel>

                <Select
                  dir="rtl"
                  value={field.value ?? undefined}      // <- key line
                  onValueChange={(val) => {
                    field.onChange(val);
                    setSelectedView(val);
                  }}
                >
                  <FormControl>
                    <SelectTrigger
                      icon={<div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                        <ChevronDown size={14} />
                      </div>}
                      className="bg-body text-[#797979] text-xs font-semibold border-none rounded-full h-12"
                    >
                      <SelectValue placeholder="اختر الإطلالة..." />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent className="shadow border-none rounded-xl bg-white">
                    {views?.map((option) => (
                      <SelectItem
                        key={option.id}
                        value={String(option.id)}
                        className="cursor-pointer focus:bg-body rounded-xl"
                      >
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"model"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center gap-1">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.82957 16.5H8.17042C5.58553 16.5 4.29307 16.5 3.41177 15.7412C2.53047 14.9823 2.34769 13.712 1.98213 11.1714L1.77305 9.71843C1.48847 7.7406 1.34618 6.75172 1.75153 5.90621C2.15687 5.0607 3.01964 4.54676 4.74518 3.51886L5.78381 2.90015C7.35078 1.96672 8.13427 1.5 9 1.5C9.86572 1.5 10.6493 1.96672 12.2162 2.90015L13.2548 3.51886C14.9803 4.54676 15.8432 5.0607 16.2484 5.90621C16.6538 6.75172 16.5115 7.7406 16.2269 9.71843L16.0179 11.1714C15.6523 13.712 15.4695 14.9823 14.5882 15.7412C13.7069 16.5 12.4144 16.5 9.82957 16.5ZM6.29818 11.6649C6.48317 11.4153 6.83546 11.363 7.08503 11.548C7.63132 11.9528 8.29065 12.1874 9.00007 12.1874C9.7095 12.1874 10.3688 11.9528 10.9151 11.548C11.1647 11.363 11.517 11.4153 11.7019 11.6649C11.887 11.9144 11.8346 12.2668 11.585 12.4517C10.8557 12.9923 9.96382 13.3124 9.00007 13.3124C8.03632 13.3124 7.14442 12.9923 6.41512 12.4517C6.16554 12.2668 6.11319 11.9144 6.29818 11.6649Z" fill="#A71755" />
                  </svg>
                  <p className="text-main-blue font-bold text-sm">
                    اختر نوع السكن
                  </p>
                </FormLabel>
                <Select dir="rtl"
                  onValueChange={(val) => {
                    field.onChange(val);
                    setSelectedFlat(val);
                  }}
                  value={field.value} >
                  <FormControl>
                    <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                      <ChevronDown size={14} />
                    </div>} className={` bg-body text-[#797979]  text-xs font-semibold border-none  rounded-full h-12`}>
                      <SelectValue placeholder={"اختر نوع السكن..."} className="text-[#797979]" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className=" shadow border-none rounded-xl bg-white  ">
                    {data?.flats?.map((option) => (
                      <SelectItem key={option} value={option} className=" cursor-pointer focus:bg-body rounded-xl">
                        {t[option]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500  text-xs " />
              </FormItem>
            )}
          />
          <button
            type="button"
            onClick={clearFilter}
            className="flex-shrink-0 h-12 py-0 px-9 mt-7 bg-[#A71755] text-white font-semibold rounded-full"
          >
            مسح النتائج
          </button>
        </div>
      </motion.form>
    </Form>
  );
};

export default FilterPanel;
