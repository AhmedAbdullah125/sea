import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

const CustomCheckBox = ({ form, name, items, dirction = "flex  items-center xl:gap-12 gap-2 p-0" }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem className={dirction}>
          {items.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      className="border-2 rounded
                        data-[state=checked]:bg-main-blue
                        data-[state=checked]:text-white
                        data-[state=checked]:border-main-blue"
                      checked={field.value?.includes(item.id)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...(field.value || []), item.id])
                          : field.onChange(
                            (field.value || []).filter((v) => v !== item.id)
                          );
                      }}
                    />
                  </FormControl>
                  <FormLabel
                    className={`p-0 text-xs font-bold ${field.value?.includes(item.id) ? "text-main-blue" : ""}`}
                  >
                    {item.label}
                  </FormLabel>
                </FormItem>
              )}
            />
          ))}
          <FormMessage className="text-red-500  text-xs " />
        </FormItem>
      )}
    />
  );
};

export default CustomCheckBox;