import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useState } from "react"
import { Link } from "react-router-dom"
import { login } from "./login"
import Loading from "../loading/Loading"

// validation
const formSchema = z.object({
  email: z.string().nonempty("هذا الحقل مطلوب"),
  password: z.string().nonempty("هذا الحقل مطلوب").min(6, "كلمة المرور يجب ان تكون على الاقل 6 حروف"),
})
const SendOtp = ({ handleSendOtp }) => {
  const [submitMethod, setSubmitMethod] = useState("whatsapp")
  const [loading, setLoading] = useState(false)
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  // 2. Define a submit handler.
  async function onSubmit(values) {
    console.log("values", values);
    login(values, setLoading, handleSendOtp)
  }
  return (
    <>
      {
        loading ? <Loading /> :
          <Form {...form}>
            <form className="loginForm xl:space-y-12 space-y-6" onSubmit={form.handleSubmit(onSubmit)} >
              {/* header */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">أهلاً بك</h2>
                <p className="text-sm font-semibold"> أدخل رقم بياناتك لتسجيل الدخول. </p>
              </div>
              {/* mobile Field */}
              {/* <div>
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
        </div> */}
              {/* password */}
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="col-span-12" dir="ltr">
                      <FormLabel className="block" dir="rtl" >
                        <p className="text-main-blue font-bold text-sm"> البريد الالكتروني <span className="text-red-500">*</span> </p>
                      </FormLabel>
                      <FormControl>
                        <input
                          type="email"
                          placeholder="البريد الالكتروني"
                          {...field}
                          dir="rtl"
                          className="h-12 w-full px-3 text-sm bg-[#F5F5F5] font-semibold text-[#797979] rounded-full border-none hover:bg-body flex items-center justify-between"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500  text-xs text-end" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="col-span-12" dir="ltr">
                      <FormLabel className="block" dir="rtl" >
                        <p className="text-main-blue font-bold text-sm"> كلمة المرور <span className="text-red-500">*</span> </p>
                      </FormLabel>
                      <FormControl>
                        <input
                          type="password"
                          placeholder="كلمة المرور"
                          {...field}
                          dir="rtl"
                          className="h-12 w-full px-3 text-sm bg-[#F5F5F5] font-semibold text-[#797979] rounded-full border-none hover:bg-body flex items-center justify-between"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500  text-xs text-end" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <Link to="/forget-password" className="text-main-blue font-bold text-sm flex">
                  نسيت كلمة المرور؟
                </Link>
                <Button
                  // onClick={() => setSubmitMethod("whatsapp")}
                  type="submit"
                  className="h-12 px-6 text-white   bg-main-blue hover:bg-main-purple transtion-all duration-300 w-full text-xs font-bold   rounded-full flex items-center justify-between  hover:text-white  ">
                  تسجيل الدخول
                </Button>
                {/* <Button
            onClick={() => setSubmitMethod("sms")}
            type="submit" className="group h-12 px-6  bg-main-blue hover:bg-main-purple transtion-all duration-300 w-full text-xs font-bold   rounded-full flex items-center justify-between  hover:text-white  ">
            إعادة إرسال بواسطة SMS
            <FaCommentSms size={20} className="text-white" />
          </Button> */}
                <Link to="/register" className="text-main-blue font-bold text-sm py-4 flex">
                  انشاء حساب جديد
                </Link>
              </div>

            </form>
          </Form>
      }
    </>
  )
}

export default SendOtp
