import { Button } from "@/components/ui/button"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
}
  from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar"
import {
  Popover, PopoverContent, PopoverTrigger,
}
  from "@/components/ui/popover"
import { ChevronDown } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { countries } from "../../data/visa"
import { cn } from "@/lib/utils"
import { format } from "date-fns";
import { TbPentagonFilled } from "react-icons/tb";
import { BsFillSendFill } from "react-icons/bs";
import { FaCalendarDays } from "react-icons/fa6";
import { FaCar, FaUsers } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { MdLanguage } from "react-icons/md";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
const countOptions = Array.from({ length: 10 }, (_, i) => {
  const num = (i + 1).toString();
  return { label: num, value: num };
});

// schema
export const filterSchema = z.object({
  start: z.string().optional(),
  end: z.string().optional(),
  date: z
    .string()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date",
    })
    .optional(),
  number: z.string().optional(),
  lang: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  model: z.string().optional(),
  type: z.string().optional(),
});

const FilterPanel = ({ defaultValues, onFilter }) => {

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
    <Form {...form}>
      <form className="space-y-4">
        <div className="grid grid-cols-12 gap-4">
          {/* start */}
          <FormField
            control={form.control}
            name={"start"}
            render={() => (
              <FormItem className="xl:col-span-3 col-span-12 ">
                <FormLabel className="flex items-center gap-1">
                  <TbPentagonFilled size={16} className="text-main-purple" />
                  <p className="text-main-blue font-bold text-sm">
                    نقطة الانطلاق
                  </p>
                </FormLabel>
                <Select dir="rtl"
                  defaultValue={values.start}
                  onValueChange={(val) => setValue("start", val)} >
                  <FormControl>
                    <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                      <ChevronDown size={14} />
                    </div>} className={`bg-body  text-[#797979]  text-xs font-semibold border-none  rounded-full h-12`}>
                      <SelectValue placeholder={"إدخـــال نقطة الانطلاق من هنــا..."} className="text-[#797979]" />
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
          />
          {/* end */}
          <FormField
            control={form.control}
            name={"end"}
            render={() => (
              <FormItem className="xl:col-span-3 col-span-12 ">
                <FormLabel className="flex items-center gap-1">
                  <BsFillSendFill size={16} className="text-main-purple" />
                  <p className="text-main-blue font-bold text-sm">
                    إخــتر  مدينة الوصول
                  </p>
                </FormLabel>
                <Select dir="rtl"
                  defaultValue={values.end}
                  onValueChange={(val) => setValue("end", val)} >
                  <FormControl>
                    <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                      <ChevronDown size={14} />
                    </div>} className={`bg-body  text-[#797979]  text-xs font-semibold border-none  rounded-full h-12`}>
                      <SelectValue placeholder={"إدخـــال نقطة الانطلاق من هنــا..."} className="text-[#797979]" />
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
          />
          {/* date */}
          <FormField
            control={form.control}
            name={"date"}
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
                      onSelect={(date) => field.onChange(date?.toISOString() ?? "")}
                      className="w-full"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-red-500  text-xs " />
              </FormItem>
            )}
          />
          {/* number */}
          <FormField
            control={form.control}
            name={"number"}
            render={() => (
              <FormItem className="xl:col-span-3 col-span-12 ">
                <FormLabel className="flex items-center gap-1">
                  <FaUsers size={16} className="text-main-purple" />
                  <p className="text-main-blue font-bold text-sm">
                    عدد الأشخــــاص
                  </p>
                </FormLabel>
                <Select dir="rtl"
                  defaultValue={values.number}
                  onValueChange={(val) => setValue("number", val)} >
                  <FormControl>
                    <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                      <ChevronDown size={14} />
                    </div>} className={`bg-body  text-[#797979]  text-xs font-semibold border-none  rounded-full h-12`}>
                      <SelectValue placeholder={"إدخـــال عدد الاشخــاص من هنــا.."} className="text-[#797979]" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className=" shadow border-none rounded-xl bg-white  ">
                    {countOptions.map((option) => (
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
        <div className="grid grid-cols-10 gap-4">
          {/* lang */}
          <FormField
            control={form.control}
            name={"lang"}
            render={() => (
              <FormItem className="xl:col-span-2 col-span-12">
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
          />
          {/* country */}
          <FormField
            control={form.control}
            name={"country"}
            render={() => (
              <FormItem className="xl:col-span-2 col-span-12">
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
                    {countries.map((option) => (
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
              <FormItem className="xl:col-span-2 col-span-12">
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
          />
          {/* model */}
          <FormField
            control={form.control}
            name={"model"}
            render={() => (
              <FormItem className="xl:col-span-2 col-span-12">
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
                    {countries.map((option) => (
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
            name={"type"}
            render={() => (
              <FormItem className="xl:col-span-2 col-span-12">
                <Select dir="rtl"
                  defaultValue={values.type}
                  onValueChange={(val) => setValue("type", val)} >
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
                    {countries.map((option) => (
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
  )
}

export default FilterPanel
