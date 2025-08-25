import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import PhoneInput from 'react-phone-number-input'
import { FaCommentSms } from "react-icons/fa6";
import { toast } from "sonner"
import { useState } from "react"
import { postToApi } from "../../api/utils/postData"

// validation
const formSchema = z.object({
  mobile: z.string().nonempty("هذا الحقل مطلوب"),
  password: z.string().nonempty("هذا الحقل مطلوب").min(6, "كلمة المرور يجب ان تكون على الاقل 6 حروف"),
})
const SendOtp = ({ handleSendOtp }) => {
  const [submitMethod, setSubmitMethod] = useState("whatsapp")
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobile: "",
      password: "",
    },
  })
  // 2. Define a submit handler.
  async function onSubmit(values) {
    const final = {
      ...values,
      mobile: values.mobile.replace("+", ''),
      type_service: submitMethod
    }
    const res = await postToApi("/send-otp", final);
    if (res.status === 200) {
      toast.success("تم ارسال الكود بنجاح")
      handleSendOtp(values.mobile)
    } else {
      toast.error("هذا الرقم مستخدم بالفعل")
    }
  }
  return (
    <Form {...form}>
      <form className="loginForm xl:space-y-12 space-y-6" onSubmit={form.handleSubmit(onSubmit)} >
        {/* header */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">
            أهلاً بك !
          </h2>
          <p className="text-sm font-semibold">
            أدخل رقم هاتفك الجوال لإنشاء حساب أو تسجيل الدخول.
          </p>
        </div>
        {/* mobile Field */}
        <div>
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem className="col-span-12" dir="ltr">
                <FormLabel className="block" dir="rtl" >
                  <p className="text-main-blue font-bold text-sm">
                    رقم هاتفك الجوال
                    <span className="text-red-500">*</span>
                  </p>
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    placeholder="+966 5xxxxxxxx"
                    value={field.value}
                    onChange={field.onChange}
                    defaultCountry="SA"
                    className="custom-phone-input"
                  />
                </FormControl>
                
                <p dir="rtl" className="text-xs ">سنقوم بإرسال رسالة إلى الرقم المدخل تحتوي على كود للمتابعة <span className="font-semibold">تأكد من إدخال رقمك بشكل صحيح.</span></p>
                <FormMessage className="text-red-500  text-xs text-end" />
              </FormItem>
              )}
              />
        </div>
              {/* password */}
              <div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="col-span-12" dir="ltr">
                      <FormControl>
                        <input
                          type="password"
                          placeholder="Password"
                          {...field}
                          className="h-12 w-full px-3 text-sm bg-[#F5F5F5] font-semibold text-[#797979] rounded-full border-none hover:bg-body flex items-center justify-between"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500  text-xs text-end" />
                    </FormItem>
                  )}
                />
              </div>
        <div className="space-y-4">
          <Button
            onClick={() => setSubmitMethod("whatsapp")}
            type="submit" className="h-12 px-6  bg-main-blue hover:bg-main-purple transtion-all duration-300 w-full text-xs font-bold   rounded-full flex items-center justify-between  hover:text-white  ">
            إرسال بواسطة واتساب
            <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.625 0.5C4.4375 0.5 0.25 4.6875 0.25 9.875C0.25 12 0.9375 14 2.25 15.625L0.9375 19.625C0.875 19.875 0.9375 20.125 1.125 20.3125C1.1875 20.4375 1.375 20.5 1.5 20.5C1.5625 20.5 1.6875 20.5 1.75 20.4375L6.0625 18.5C7.1875 19 8.375 19.25 9.625 19.25C14.8125 19.25 19 15.0625 19 9.875C19 4.6875 14.8125 0.5 9.625 0.5Z" fill="#25D366" />
              <path d="M15.0625 13.3125C14.8125 14.0625 13.875 14.6875 13.0625 14.8125C12.875 14.875 12.6875 14.875 12.4375 14.875C11.9375 14.875 11.1875 14.75 9.875 14.1875C8.375 13.5625 6.875 12.25 5.6875 10.5625V10.5C5.3125 9.9375 4.625 8.875 4.625 7.75C4.625 6.375 5.3125 5.6875 5.5625 5.375C5.875 5.0625 6.3125 4.875 6.8125 4.875C6.9375 4.875 7 4.875 7.125 4.875C7.5625 4.875 7.875 5 8.1875 5.625L8.4375 6.125C8.625 6.625 8.875 7.1875 8.9375 7.25C9.125 7.625 9.125 7.9375 8.9375 8.25C8.875 8.4375 8.75 8.5625 8.625 8.6875C8.5625 8.8125 8.5 8.875 8.4375 8.875C8.375 8.9375 8.375 8.9375 8.3125 9C8.5 9.3125 8.875 9.875 9.375 10.3125C10.125 11 10.6875 11.1875 11 11.3125C11.125 11.1875 11.25 10.9375 11.4375 10.75L11.5 10.625C11.8125 10.1875 12.3125 10.0625 12.8125 10.25C13.0625 10.375 14.4375 11 14.4375 11L14.5625 11.0625C14.75 11.1875 15 11.25 15.125 11.5C15.375 12.0625 15.1875 12.875 15.0625 13.3125Z" fill="white" />
            </svg>
          </Button>
          {/* <Button
            onClick={() => setSubmitMethod("sms")}
            type="submit" className="group h-12 px-6  bg-main-blue hover:bg-main-purple transtion-all duration-300 w-full text-xs font-bold   rounded-full flex items-center justify-between  hover:text-white  ">
            إعادة إرسال بواسطة SMS
            <FaCommentSms size={20} className="text-white" />
          </Button> */}
        </div>

      </form>
    </Form>
  )
}

export default SendOtp
