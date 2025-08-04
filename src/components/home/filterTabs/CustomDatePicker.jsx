import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronDown } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

import { useState } from "react";

const CustomDatePicker = ({
  name,
  label,
  form,
  placeholder = "Pick a date",
  disabledDate,
  icon,
  isRequired = false,
  colSpan = "xl:col-span-3 md:col-span-6 col-span-12",
  bg = "bg-body",
  triggerRef,
  open,
  setOpen,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={`xl:col-span-2 md:col-span-5 col-span-10 flex flex-col`}>
          {label && (
            <FormLabel className="flex items-center gap-1">
              {icon}
              <p className="text-main-blue font-bold text-sm">{label}</p>
              {isRequired && <span className="text-red-500">*</span>}
            </FormLabel>
          )}

          <Popover open={open ?? internalOpen} onOpenChange={setOpen ?? setInternalOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  ref={triggerRef}
                  variant="outline"
                  className={cn(
                    "h-12 w-full px-3 font-xs font-semibold text-main-gray rounded-full border-none hover:bg-body flex items-center justify-between",
                    bg,
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span className="text-[#797979] text-xs font-semibold">{placeholder}</span>
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
                  if (setOpen) setOpen(false); // close after selection
                }}
                fromDate={new Date()}
                initialFocus
                className="w-full"
              />
            </PopoverContent>
          </Popover>

          <FormMessage className="text-red-500 text-xs" />
        </FormItem>
      )}
    />
  );
};

export default CustomDatePicker;
