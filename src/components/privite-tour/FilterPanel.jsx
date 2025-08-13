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
import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsFillSendFill } from "react-icons/bs";
import { FaCar, FaUsers } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import { MdLanguage } from "react-icons/md";
import { TbPentagonFilled } from "react-icons/tb";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { fetchFromApi } from "../../api/utils/fetchData";
import {motion} from "framer-motion"
const countOptions = Array.from({ length: 100 }, (_, i) => {
  const num = (i + 1).toString();
  return { label: num, value: num };
});

// schema
export const filterSchema = z.object({
  moving_point: z.string().optional(),
  city: z.string().optional(),
  date_and_time: z
    .string()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date",
    })
    .optional(),
  number_of_person: z.string().optional(),
  country: z.string().optional(),
  model: z.string().optional(),
  car_types_id: z.string().optional(),
});

const FilterPanel = ({ defaultValues, onFilter, onReset }) => {
  const { data } = useQuery({
    queryKey: [`all-filters`],
    queryFn: async () => {
      const res = await fetchFromApi("/all-filters");
      return res;
    }
  })

  // countries
  const countries = data?.data?.data?.countries?.map((item) => ({ label: item?.country, value: String(item?.id) }))
  // cites
  const cities = data?.data?.data?.cities?.map((item) => ({ label: item?.city, value: String(item?.id) }))
  // moving points
  const movingPoints = data?.data?.data?.movePoint?.map((item) => ({ label: item, value: item }))
  // models
  const models = data?.data?.data?.carModel?.map((item) => ({ label: item, value: item }))
  // car types
  const carTypes = data?.data?.data?.carType?.map((item) => ({ label: item?.name, value: item?.name }))

  const form = useForm({
    resolver: zodResolver(filterSchema),
    defaultValues,
  });
  const { watch, setValue } = form;
  const values = watch();
  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilter(values);
    }, 200); // debounce
    return () => clearTimeout(timeout);
  }, [values, onFilter]);
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {
        Object.values(values).some((val) => val) &&
        <Button onClick={() => {
          onReset()
          form.reset()
          setValue("moving_point", "")
          setValue("city", "")
          setValue("date_and_time", "")
          setValue("number_of_person", "")
          setValue("country", "")
          setValue("model", "")
          setValue("car_types_id", "")
          
          } }
          className="flex items-center gap-2 text-main-blue font-bold text-sm mb-4">
          <HiOutlineBars3CenterLeft size={16} />
          <p>حذف الفلتر</p>
        </Button>
      }
      <Form {...form}>
        <form className="space-y-4">
          <div className="grid grid-cols-12 gap-4">
            {/* moving_point */}
            <FormField
              control={form.control}
              name={"moving_point"}
              render={() => (
                <FormItem className="xl:col-span-3 col-span-12 ">
                  <FormLabel className="flex items-center gap-1">
                    <TbPentagonFilled size={16} className="text-main-purple" />
                    <p className="text-main-blue font-bold text-sm">
                      نقطة الانطلاق
                    </p>
                  </FormLabel>
                  <Select dir="rtl"
                    defaultValue={values.moving_point}
                    onValueChange={(val) => setValue("moving_point", val)} >
                    <FormControl>
                      <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                        <ChevronDown size={14} />
                      </div>} className={`bg-body  text-[#797979]  text-xs font-semibold border-none  rounded-full h-12`}>
                        <SelectValue placeholder={"إدخـــال نقطة الانطلاق من هنــا..."} className="text-[#797979]" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className=" shadow border-none rounded-xl bg-white  ">
                      {movingPoints?.map((option) => (
                        <SelectItem key={option.value} value={option.value} className=" cursor-pointer focus:bg-body rounded-xl">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {/* city */}
            <FormField
              control={form.control}
              name={"city"}
              render={() => (
                <FormItem className="xl:col-span-3 col-span-12 ">
                  <FormLabel className="flex items-center gap-1">
                    <BsFillSendFill size={16} className="text-main-purple" />
                    <p className="text-main-blue font-bold text-sm">
                      إخــتر  مدينة الوصول
                    </p>
                  </FormLabel>
                  <Select dir="rtl"
                    defaultValue={values.city}
                    onValueChange={(val) => setValue("city", val)} >
                    <FormControl>
                      <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                        <ChevronDown size={14} />
                      </div>} className={`bg-body  text-[#797979]  text-xs font-semibold border-none  rounded-full h-12`}>
                        <SelectValue placeholder={"إدخـــال  مدينة الوصول من هنــا..."} className="text-[#797979]" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className=" shadow border-none rounded-xl bg-white  ">
                      {cities?.map((option) => (
                        <SelectItem key={option.value} value={option.value} className=" cursor-pointer focus:bg-body rounded-xl">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {/* date_and_time */}
            <FormField
              control={form.control}
              name={"date_and_time"}
              render={({ field }) => (
                <FormItem className={`xl:col-span-3 col-span-12   flex flex-col`}>
                  <FormLabel className="flex items-center gap-1">
                    <FaCalendarDays size={16} className="text-main-purple" />
                    <p className="text-main-blue font-bold text-sm">
                      التاريخ والوقت
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
            { /* number_of_person */}
            <FormField
              control={form.control}
              name={"number_of_person"}
              render={() => (
                <FormItem className="xl:col-span-3 col-span-12 ">
                  <FormLabel className="flex items-center gap-1">
                    <FaUsers size={16} className="text-main-purple" />
                    <p className="text-main-blue font-bold text-sm">
                      عدد الأشخــــاص
                    </p>
                  </FormLabel>
                  <Select dir="rtl"
                    defaultValue={values.number_of_person}
                    onValueChange={(val) => setValue("number_of_person", val)} >
                    <FormControl>
                      <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                        <ChevronDown size={14} />
                      </div>} className={`bg-body  text-[#797979]  text-xs font-semibold border-none  rounded-full h-12`}>
                        <SelectValue placeholder={"إدخـــال عدد الاشخــاص من هنــا.."} className="text-[#797979]" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className=" shadow border-none rounded-xl bg-white  ">
                      {countOptions?.map((option) => (
                        <SelectItem key={option.value} value={option.value} className=" cursor-pointer focus:bg-body rounded-xl">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-12 gap-4">
            {/* lang */}
            {/* <FormField
            control={form.control}
            name={"lang"}
            render={() => (
              <FormItem className="xl:col-span-3 col-span-12">
                <Select dir="rtl"
                  defaultValue={values.lang}
                  onValueChange={(val) => setValue("lang", val)} >
                  <FormControl>
                    <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white ">
                      <ChevronDown size={14} />
                    </div>}
                      className={`bg-main-navy  text-white text-xs font-semibold border-none  rounded-full h-12`}>
                      <SelectValue placeholder={
                        <div className=" text-white flex items-center gap-1">
                          <IoLanguage size={16} />
                          <p >اللّغة</p>
                        </div>} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className=" shadow border-none rounded-xl bg-white  ">
                    {countries.map((option) => (
                      <SelectItem key={option.value} value={option.value} className=" cursor-pointer focus:bg-body rounded-xl">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          /> */}
            {/* country */}
            <FormField
              control={form.control}
              name={"country"}
              render={() => (
                <FormItem className="xl:col-span-4 col-span-12">
                  <Select dir="rtl"
                    defaultValue={values.country}
                    onValueChange={(val) => setValue("country", val)} >
                    <FormControl>
                      <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white ">
                        <ChevronDown size={14} />
                      </div>}
                        className={`bg-main-navy  text-white text-xs font-semibold border-none  rounded-full h-12`}>
                        <SelectValue placeholder={
                          <div className=" text-white flex items-center gap-1">
                            <MdLanguage size={16} />
                            <p >الدّول</p>
                          </div>} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className=" shadow border-none rounded-xl bg-white  ">
                      {countries?.map((option) => (
                        <SelectItem key={option.value} value={option.value} className=" cursor-pointer focus:bg-body rounded-xl">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {/* city */}
            {/* <FormField
            control={form.control}
            name={"city"}
            render={() => (
              <FormItem className="xl:col-span-4 col-span-12">
                <Select dir="rtl"
                  defaultValue={values.city}
                  onValueChange={(val) => setValue("city", val)} >
                  <FormControl>
                    <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white ">
                      <ChevronDown size={14} />
                    </div>}
                      className={`bg-main-navy  text-white text-xs font-semibold border-none  rounded-full h-12`}>
                      <SelectValue placeholder={
                        <div className=" text-white flex items-center gap-1">
                          <MdLanguage size={16} />
                          <p >مدينة الوصول</p>
                        </div>} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className=" shadow border-none rounded-xl bg-white  ">
                    {countries.map((option) => (
                      <SelectItem key={option.value} value={option.value} className=" cursor-pointer focus:bg-body rounded-xl">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          /> */}
            {/* model */}
            <FormField
              control={form.control}
              name={"model"}
              render={() => (
                <FormItem className="xl:col-span-4 col-span-12">
                  <Select dir="rtl"
                    defaultValue={values.model}
                    onValueChange={(val) => setValue("model", val)} >
                    <FormControl>
                      <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white ">
                        <ChevronDown size={14} />
                      </div>}
                        className={`bg-main-navy  text-white text-xs font-semibold border-none  rounded-full h-12`}>
                        <SelectValue placeholder={
                          <div className=" text-white flex items-center gap-1">
                            <FaCar size={16} />
                            <p >المويدلات</p>
                          </div>} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className=" shadow border-none rounded-xl bg-white  ">
                      {models?.map((option) => (
                        <SelectItem key={option.value} value={option.value} className=" cursor-pointer focus:bg-body rounded-xl">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {/* type */}
            <FormField
              control={form.control}
              name={"car_types_id"}
              render={() => (
                <FormItem className="xl:col-span-4 col-span-12">
                  <Select dir="rtl"
                    defaultValue={values.car_types_id}
                    onValueChange={(val) => setValue("car_types_id", val)} >
                    <FormControl>
                      <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white ">
                        <ChevronDown size={14} />
                      </div>}
                        className={`bg-main-navy  text-white text-xs font-semibold border-none  rounded-full h-12`}>
                        <SelectValue placeholder={
                          <div className=" text-white flex items-center gap-1">
                            <HiOutlineBars3CenterLeft size={16} />
                            <p >النوع</p>
                          </div>} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className=" shadow border-none rounded-xl bg-white  ">
                      {carTypes?.map((option) => (
                        <SelectItem key={option.value} value={option.value} className=" cursor-pointer focus:bg-body rounded-xl">
                          {option.label}
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
    </motion.div>
  )
}

export default FilterPanel
