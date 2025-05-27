import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const CustomInput = ({
  name,
  icon,
  label,
  placeholder = "",
  form,
  colSpan = "xl:col-span-3 md:col-span-6 col-span-12",
  isRequired = false,
  type = "text",
  bg="bg-body"
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={`${colSpan} `}>
          <FormLabel className="flex items-center gap-1">
            {icon && icon}
            <p className="text-main-blue font-bold text-sm">
              {label}
              {isRequired && <span className="text-red-500">*</span>}
            </p>
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              className={`h-12 ${bg} text-[#797979] text-xs font-semibold border-none rounded-full placeholder:text-[#797979]`}
              dir="rtl"
            />
          </FormControl>
          <FormMessage className="text-red-500  text-xs " />
        </FormItem>
      )}
    />
  );
};

export default CustomInput;