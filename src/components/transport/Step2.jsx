import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { countries } from "../../data/visa"
import CustomFilterSelect from "../home/filterTabs/CustomFilterSelect"
import CustomInput from "../home/filterTabs/CustomInput"
import { toast } from "sonner"
import { userContext } from "../../context/UserContext"
const formSchema = z.object({
  number: z.string().nonempty("هذا الحقل مطلوب"),
  payMthod: z.string().nonempty("هذا الحقل مطلوب"),
  name: z.string().nonempty("هذا الحقل مطلوب"),
  surname: z.string().nonempty("هذا الحقل مطلوب"),
  notes: z.string().nonempty("هذا الحقل مطلوب"),
  picture: z.instanceof(File, { message: "هذا الحقل مطلوب" }),
})
const Step2 = ({ nextStep }) => {
  const {token}=useContext(userContext)
  // img preview
  const [picturePreview, setPicturePreview] = useState(null);
  const handlePictureChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPicturePreview(previewUrl);
      form.setValue("picture", file);
    }
  };

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: "",
      payMthod: "",
      name: "",
      surname: "",
      notes: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values) {
    if (!token) {
      toast.error("يجب تسجيل الدخول اولا");
      return
    }
    toast.success("تم التسجيل بنجاح");
    setTimeout(() => {
      nextStep();
    }, 2000);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-12 gap-5 w-full ">
        {/* number */}
        <CustomInput bg="bg-white" name="number" type="text" label="رقـــم الرحلــة" placeholder="إدخـــال رقــم الرحلة هنــا..." form={form} colSpan=" md:col-span-6 col-span-12" />
        {/* payMthod */}
        <CustomFilterSelect bg="bg-white" placeholder="إدخـــال طريقة السداد هنــا..." form={form} name="payMthod" label="طريــقة السداد" options={countries} colSpan=" md:col-span-6 col-span-12" />
        {/* name */}
        <CustomInput bg="bg-white" name="name" type="text" label="الاســـم" placeholder="إدخـــال الاسم هنـــا..." form={form} colSpan=" md:col-span-6 col-span-12" />
        {/* surname */}
        <CustomInput bg="bg-white" name="surname" type="text" label="اللقب" placeholder="إدخـــال اللقب هنـــا..." form={form} colSpan=" md:col-span-6 col-span-12" />
        {/* notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem className="col-span-12">
              <FormLabel>
                <p className="text-main-blue font-bold text-sm">
                  ملاحظات
                </p>
              </FormLabel>
              <FormControl>
                <Textarea
                  className={` h-24 resize-none bg-white text-[#797979] text-xs font-semibold border-none rounded-3xl placeholder:text-[#797979] p-6`}
                  placeholder="أكتب هنــا..."

                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500  text-xs " />
            </FormItem>
          )}
        />
        {/* picture */}
        <FormField
          control={form.control}
          name="picture"
          render={({ field }) => (
            <FormItem className=" col-span-12" dir="ltr">
              <FormLabel className="flex items-center justify-center bg-white  rounded-3xl h-auto p-6" dir="rtl" htmlFor="picture">
                {picturePreview ?
                  <img
                    src={picturePreview}
                    alt="picture"
                    width={150}
                    height={150}
                    className="object-cover rounded-full"
                  /> :
                  <div className="flex items-center justify-between w-full">
                    <div className=" flex  justify-center items-center gap-2">
                      <div className=" border size-14 rounded-full flex items-center justify-center">
                        <svg width="69" height="70" viewBox="0 0 69 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect y="0.5" width="69" height="69" rx="34.5" fill="black" />
                          <path d="M31.5 34V40L33.5 38" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M31.5 40L29.5 38" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M44.5 33V38C44.5 43 42.5 45 37.5 45H31.5C26.5 45 24.5 43 24.5 38V32C24.5 27 26.5 25 31.5 25H36.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M44.5 33H40.5C37.5 33 36.5 32 36.5 29V25L44.5 33Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                      </div>
                      <div>
                        <p className="text-black font-bold text-xs">
                          ارفاق صــورة التذكــرة
                        </p>
                        <p className="text-xs text-main-gray mt-2">* png - jpeg *</p>
                      </div>
                    </div>
                    {/* icon */}
                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clip-rule="evenodd" d="M0 8C0 4.46446 -8.9407e-08 2.6967 1.09835 1.59835C2.1967 0.5 3.96446 0.5 7.5 0.5C11.0355 0.5 12.8033 0.5 13.9016 1.59835C15 2.6967 15 4.46446 15 8C15 11.5355 15 13.3033 13.9016 14.4016C12.8033 15.5 11.0355 15.5 7.5 15.5C3.96446 15.5 2.1967 15.5 1.09835 14.4016C-8.9407e-08 13.3033 0 11.5355 0 8ZM7.5 12.3125C7.81065 12.3125 8.0625 12.0607 8.0625 11.75V7.85803L9.35228 9.14773C9.57195 9.3674 9.92805 9.3674 10.1477 9.14773C10.3674 8.92805 10.3674 8.57195 10.1477 8.35228L7.89773 6.10225C7.79228 5.99677 7.64918 5.9375 7.5 5.9375C7.35083 5.9375 7.20773 5.99677 7.10228 6.10225L4.85225 8.35228C4.63259 8.57195 4.63259 8.92805 4.85225 9.14773C5.07192 9.3674 5.42808 9.3674 5.64775 9.14773L6.9375 7.85803V11.75C6.9375 12.0607 7.18935 12.3125 7.5 12.3125ZM4.5 4.8125C4.18934 4.8125 3.9375 4.56066 3.9375 4.25C3.9375 3.93934 4.18934 3.6875 4.5 3.6875H10.5C10.8107 3.6875 11.0625 3.93934 11.0625 4.25C11.0625 4.56066 10.8107 4.8125 10.5 4.8125H4.5Z" fill="black" />
                    </svg>

                  </div>
                }
              </FormLabel>
              <FormControl>
                <Input accept="image/png, image/jpeg" id="picture" type="file" className="hidden"
                  onChange={handlePictureChange} />
              </FormControl>
              <FormMessage className="text-red-500  text-xs text-end" />
            </FormItem>
          )}
        />

        <Button type="submit" className=" col-span-12 bg-main-purple w-fit m-auto text-white text-xs font-bold  hover:bg-main-blue transation-all duration-300 rounded-full px-12 py-2 " >تـــأكيد الحجـــز الان</Button>
      </form>
    </Form>
  );
};

export default Step2;
