import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import PhoneInput from 'react-phone-number-input'
import CustomInput from "../home/filterTabs/CustomInput"
import { FaEnvelope } from "react-icons/fa";

// validation
const formSchema = z.object({
  otp: z.string().nonempty("هذا الحقل مطلوب"),
})


const VerfiyOtp = ({ phone }) => {
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  })
  // 2. Define a submit handler.
  function onSubmit(values) {
    console.log(values)
  }
  return (
    <Form {...form}>
      <form className="loginForm xl:space-y-8 space-y-6" onSubmit={form.handleSubmit(onSubmit)} >
        {/* header */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">
            الرجاء إدخال الكود للمتابعة
          </h2>
          <p className="text-sm font-semibold">
            لقد أرسلنا الكود برسالة إلى الرقم - (<span className="font-bold" dir="ltr">{phone}</span>)
          </p>
        </div>
        {/* input */}
        <CustomInput form={form} name="otp" type="text" placeholder="ادخل رمز التحقق" label="رمز التحقق" isRequired={true} bg="bg-body" />
        <Button type="submit" className="h-12  bg-main-blue w-full  text-white border-2 border-main-blue hover:bg-white hover:text-main-blue rounded-full flex items-center gap-14">
          تحقيق
        </Button>
        <div className="flex items-center justify-center gap-2">
          <div className="w-full h-[2px] bg-body"></div>
          <p className="text-xs font-bold shrink-0">
            لم تصلك الرسالة بعد؟
          </p>
          <div className="w-full h-[2px] bg-body"></div>
        </div>

        <div className="space-y-3">
          <Button className="h-12 px-6  bg-body w-full text-xs font-bold   rounded-full flex items-center justify-between hover:bg-main-blue hover:text-white  ">
            إرسال بواسطة واتساب
            <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.625 0.5C4.4375 0.5 0.25 4.6875 0.25 9.875C0.25 12 0.9375 14 2.25 15.625L0.9375 19.625C0.875 19.875 0.9375 20.125 1.125 20.3125C1.1875 20.4375 1.375 20.5 1.5 20.5C1.5625 20.5 1.6875 20.5 1.75 20.4375L6.0625 18.5C7.1875 19 8.375 19.25 9.625 19.25C14.8125 19.25 19 15.0625 19 9.875C19 4.6875 14.8125 0.5 9.625 0.5Z" fill="#25D366" />
              <path d="M15.0625 13.3125C14.8125 14.0625 13.875 14.6875 13.0625 14.8125C12.875 14.875 12.6875 14.875 12.4375 14.875C11.9375 14.875 11.1875 14.75 9.875 14.1875C8.375 13.5625 6.875 12.25 5.6875 10.5625V10.5C5.3125 9.9375 4.625 8.875 4.625 7.75C4.625 6.375 5.3125 5.6875 5.5625 5.375C5.875 5.0625 6.3125 4.875 6.8125 4.875C6.9375 4.875 7 4.875 7.125 4.875C7.5625 4.875 7.875 5 8.1875 5.625L8.4375 6.125C8.625 6.625 8.875 7.1875 8.9375 7.25C9.125 7.625 9.125 7.9375 8.9375 8.25C8.875 8.4375 8.75 8.5625 8.625 8.6875C8.5625 8.8125 8.5 8.875 8.4375 8.875C8.375 8.9375 8.375 8.9375 8.3125 9C8.5 9.3125 8.875 9.875 9.375 10.3125C10.125 11 10.6875 11.1875 11 11.3125C11.125 11.1875 11.25 10.9375 11.4375 10.75L11.5 10.625C11.8125 10.1875 12.3125 10.0625 12.8125 10.25C13.0625 10.375 14.4375 11 14.4375 11L14.5625 11.0625C14.75 11.1875 15 11.25 15.125 11.5C15.375 12.0625 15.1875 12.875 15.0625 13.3125Z" fill="white" />
            </svg>
          </Button>
          <Button className="group h-12 px-6  bg-body w-full text-xs font-bold   rounded-full flex items-center justify-between hover:bg-main-blue hover:text-white  ">
            إعادة إرسال بواسطة البريد الالكتروني            <FaEnvelope size={20} className="text-main-blue group-hover:text-white" />
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default VerfiyOtp
