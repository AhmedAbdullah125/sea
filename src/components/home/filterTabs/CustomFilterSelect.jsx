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

const CustomFilterSelect = ({
  name,
  icon,
  label,
  placeholder = "Select an option",
  options,
  form,
  colSpan = "xl:col-span-3 md:col-span-6 col-span-12",
  isRequired = false,
  bg="bg-body"
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={`${colSpan} `}>
          <FormLabel className="flex items-center gap-1">
            {icon ? icon : null}
            <p className="text-main-blue font-bold text-sm">
              {label}
              {isRequired && <span className="text-red-500">*</span>}
            </p>
          </FormLabel>
          <Select dir="rtl" onValueChange={field.onChange} defaultValue={field.value} >
            <FormControl>
              <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                <ChevronDown size={14} />
              </div>} className={` ${bg} text-[#797979]  text-xs font-semibold border-none  rounded-full h-12`}>
                <SelectValue placeholder={placeholder} className="text-[#797979]" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className=" shadow border-none rounded-xl bg-white  ">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value} className=" cursor-pointer focus:bg-body rounded-xl">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="text-red-500  text-xs " />
        </FormItem>
      )}
    />
  )
}

export default CustomFilterSelect