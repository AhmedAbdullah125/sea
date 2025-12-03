import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BsFillSendFill } from "react-icons/bs";
import { ChevronDown } from "lucide-react";
import { useGetCountries } from '@/components/global/useGetCountries';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import axios from "axios";
import { API_BASE_URL } from "@/lib/apiConfig";

// schema
export const filterSchema = z.object({
  country: z.string().optional(),
  city: z.string().optional(),
});

const FilterPanel = ({ setLoading, selectedCountry, setSelectedCountry, selectedCity, setSelectedCity, setCityName, setCountryName, }) => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/countries`, {});
        setCountries(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error retrieving data:', error);
        setLoading(false);
        throw new Error('Could not get data');
      }
    };
    getData();
  }, []);
  const form = useForm({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      country: selectedCountry ?? "",
      city: selectedCity ?? "",
    },
  });
  return (
    <div className="container">
  
       
          <Form {...form}>
            <motion.form
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4 mb-10"
              // you can add onSubmit here if needed
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex gap-4 xl:flex-nowrap flex-wrap">
                {/* COUNTRY */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="xl:col-span-3 col-span-12 w-full">
                      <FormLabel className="flex items-center gap-1">
                        <BsFillSendFill size={16} className="text-main-purple" />
                        <p className="text-main-blue font-bold text-sm">
                          إختـــر الدولـــة
                        </p>
                      </FormLabel>

                      <Select
                        dir="rtl"
                        value={field.value ?? ""}
                       
                        onValueChange={(val) => {
                          field.onChange(val);          // tell RHF
                          setSelectedCountry(val);      // update parent
                          setSelectedCity(undefined);   // reset city
                          form.setValue("city", "");    // reset city in form
                          setCountryName(countries?.find((cont) => String(cont.id) === val)?.name);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger
                            icon={
                              <div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                                <ChevronDown size={14} />
                              </div>
                            }
                            className="bg-body text-[#797979] text-xs font-semibold border-none rounded-full h-12"
                          >
                            <SelectValue
                              placeholder="إدخـــال نقطة الانطلاق من هنــا..."
                              className="text-[#797979]"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="shadow border-none rounded-xl bg-white">
                          {countries?.map((option) => (
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

                {/* CITY */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="xl:col-span-3 col-span-12 w-full">
                      <FormLabel className="flex items-center gap-1">
                        <BsFillSendFill size={16} className="text-main-purple" />
                        <p className="text-main-blue font-bold text-sm">
                          إختـــر المدينة
                        </p>
                      </FormLabel>

                      <Select
                        dir="rtl"
                        disabled={!selectedCountry}
                        value={field.value ?? ""}
                        onValueChange={(val) => {
                          field.onChange(val);
                          setSelectedCity(val);
                          setCityName(countries?.find((cont) => String(cont.id) === selectedCountry)?.cities?.find((city) => String(city.id) === val)?.name);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger
                            icon={
                              <div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                                <ChevronDown size={14} />
                              </div>
                            }
                            className="bg-body text-[#797979] text-xs font-semibold border-none rounded-full h-12"
                          >
                            <SelectValue
                              placeholder="إدخـــال نقطة الانطلاق من هنــا..."
                              className="text-[#797979]"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="shadow border-none rounded-xl bg-white">
                          {countries?.find((cont) => cont.id === Number(selectedCountry))?.cities?.map((option) => (
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
              </div>
            </motion.form>
          </Form>
     
    </div>
  );
};

export default FilterPanel;
