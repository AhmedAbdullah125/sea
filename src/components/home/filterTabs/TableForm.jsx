import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import CustomFilterSelect from "./CustomFilterSelect"
import { useQuery } from "@tanstack/react-query"
import { fetchFromApi } from "../../../api/utils/fetchData"
import { useNavigate } from "react-router-dom"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronDown } from "lucide-react"

const formSchema = z.object({
  destination: z.string().nonempty("هذا الحقل مطلوب"),
  city: z.string().nonempty("هذا الحقل مطلوب"),
})


const TableForm = () => {
  const navigate = useNavigate()
  const { data } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await fetchFromApi("/countries");
      return res;
    }
  })
  const { data: cities } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const res = await fetchFromApi("/cities");
      return res;
    }
  })

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "",
      city: "",
    },
  })

  function onSubmit(values) {
    const queryParams = new URLSearchParams({
      destination: values.destination,
      city: values.city,
    }).toString();
    navigate(`/table?${queryParams}`);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-12 gap-x-4 xl:gap-y-6 gap-y-4">
        <FormField
          control={form.control}
          name={"destination"}
          render={({ field }) => (
            <FormItem className={" md:col-span-6 col-span-12"}>
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
                  {data?.data?.data?.map((option) => (
                    <SelectItem key={option?.id} value={option.id} className=" cursor-pointer focus:bg-body rounded-xl">
                      {option.name}
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
            <FormItem className={" md:col-span-6 col-span-12"}>
              <FormLabel className="flex items-center gap-1">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.89567 2.2193L12.6681 4.4693C17.2206 5.9918 17.2206 8.47432 12.6681 9.98932L10.6581 10.6568L9.99067 12.6668C8.47567 17.2193 5.98567 17.2193 4.47067 12.6668L2.21317 5.9018C1.20817 2.8643 2.85817 1.2068 5.89567 2.2193ZM5.65567 6.2543L8.50567 9.11932C8.61817 9.23182 8.76067 9.28432 8.90317 9.28432C9.04567 9.28432 9.18817 9.23182 9.30067 9.11932C9.51817 8.90182 9.51817 8.54182 9.30067 8.32432L6.45067 5.4593C6.23317 5.2418 5.87317 5.2418 5.65567 5.4593C5.43817 5.6768 5.43817 6.0368 5.65567 6.2543Z" fill="#A71755" />
                </svg>
                <p className="text-main-blue font-bold text-sm">
                  المدينة المتجه لها
                </p>
              </FormLabel>
              <Select dir="rtl" onValueChange={field.onChange} value={field.value} defaultValue={field.value} >
                <FormControl>
                  <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                    <ChevronDown size={14} />
                  </div>} className={` bg-body text-[#797979]  text-xs font-semibold border-none  rounded-full h-12`}>
                    <SelectValue placeholder={"إدخـــال المدينة هنــا.."} className="text-[#797979]" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className=" shadow border-none rounded-xl bg-white  ">
                  {cities?.data?.data?.map((option) => (
                    <SelectItem key={option?.id} value={option.id} className=" cursor-pointer focus:bg-body rounded-xl">
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500  text-xs " />
            </FormItem>
          )}
        />



        <Button type="submit" className=" col-span-12 bg-main-purple w-fit m-auto text-white  hover:bg-main-blue transition-all duration-300  rounded-full flex items-center gap-14">بحـــــث
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
    </Form>
  )
}

export default TableForm
