import axios from "axios";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FaArrowsLeftRight, FaCalendarDays } from "react-icons/fa6";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { BsFillSendFill } from "react-icons/bs";
import { IoLanguage } from "react-icons/io5";
import { MdStarRate } from "react-icons/md";
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

const FilterPanel = ({ defaultValues, onFilter, setMainData, setLoading }) => {
  const [seletedCountry, setSelectedCountry] = useState(String(defaultValues.destination) || '');
  const [selectedFlat, setSelectedFlat] = useState(defaultValues.flat || '');
  const [selectedCity, setSelectedCity] = useState(defaultValues.city || '');
  const [seletedNeighborhood, setSelectedNeighborhood] = useState(defaultValues.neighborhood || '');
  const [seletedRate, setSelectedRate] = useState(defaultValues.rate || '');
  const [selectedOffer, setSelectedOffer] = useState(defaultValues.offer || '');
  const [selectedDate, setSelectedDate] = useState(defaultValues.start || '');
  const [selectedDateTo, setSelectedDateTo] = useState(defaultValues.end || '');
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/all-filters`);
        const response2 = await axios.get(`${API_BASE_URL}/cities`);
        setData(response.data.data);
        setFilters(response.data.data);
        setCities(response2.data.data);
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
      setLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    const getHotels = async () => {
      setLoading(true);
      try {
        const query = `${API_BASE_URL}/filter-hotels?country_id=${seletedCountry}` +
          `${selectedDate ? `&available_from=${formatDate(selectedDate)}` : ""}` +
          `${selectedDateTo ? `&available_to=${formatDate(selectedDateTo)}` : ""}` +
          `&offer=${selectedOffer}&city_id=${selectedCity}&type=${selectedFlat}&neighborhood=${seletedNeighborhood}&rating=${seletedRate}`;
        const response = await axios.get(query);
        setMainData(response.data.data);
      } catch (error) {
        console.error('Error retrieving hotels:', error);
      }
      setLoading(false);
    };
    getHotels();
  }, [seletedCountry, selectedCity, selectedDate, selectedFlat, seletedNeighborhood, seletedRate, selectedOffer, selectedDateTo]);

  const form = useForm({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      start: String(defaultValues.destination) || '',
      end: defaultValues.city || '',
      date: defaultValues.start || '',
      dateTo: defaultValues.end || '',
      lang: defaultValues.flat || '',
      country: defaultValues.neighborhood || '',
      rating: defaultValues.rate || '',
      model: defaultValues.offer || '',
    },
  });

  const { watch, setValue } = form;
  const values = watch();

  const t = {
    "flat": "شقق فندقية",
    "room": "غرفة",
    "hotel": "⁠فنادق",
    "villa": "فلل",
    "huts": "أكواخ",
    "hotel_suites": "أجنحة فندقية"
  };

  function clearFilter() {
    setValue("start", "");
    setValue("end", "");
    setValue("date", "");
    setValue("dateTo", "");
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
    setSelectedDateTo('');
  }

  return (
    <Form {...form}>
      <motion.form
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="space-y-4 mb-10">
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
                  defaultValue={String(defaultValues.destination || "")}
                  onValueChange={(val) => setSelectedCountry(val)} >
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
            render={() => (
              <FormItem className="xl:col-span-3 col-span-12 w-full ">
                <FormLabel className="flex items-center gap-1">
                  <BsFillSendFill size={16} className="text-main-purple" />
                  <p className="text-main-blue font-bold text-sm">
                    إختــــــر المديــنة
                  </p>
                </FormLabel>
                <Select dir="rtl"
                  defaultValue={String(defaultValues.city || "")}
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
