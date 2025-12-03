import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
import { FaCommentSms } from "react-icons/fa6"
import { verifyEmail } from "./verifyEmail"
import { useState } from "react"
import Loading from "../loading/Loading"
import { resendOTP } from "./resendOTP"
import { InputOTP, InputOTPGroup, InputOTPSlot, } from "@/components/ui/input-otp"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

// validation
const formSchema = z.object({
  otp: z.string().min(4, "يجب إدخال 4 أرقام").max(4, "يجب إدخال 4 أرقام"),
})
const VerfiyOtp = ({ phone,link }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  })
  // 2. Define a submit handler.
  async function onSubmit(values) {
    verifyEmail(values, phone, setLoading, navigate,link)
  }
  //resend otp
  const resendOtp = () => {
    resendOTP(phone, setLoading)
  }
  return (
    <>
      {
        loading ? <Loading /> :
          <Form {...form}>
            <form className="loginForm xl:space-y-8 space-y-6" onSubmit={form.handleSubmit(onSubmit)} >
              {/* header */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold"> الرجاء إدخال الكود للمتابعة</h2>
                <p className="text-sm font-semibold"> لقد أرسلنا الكود  إلى - (<span className="font-bold" dir="ltr">{phone}</span>) </p>
              </div>
              {/* input */}
              <FormField
                control={form.control}
                name="otp"

                render={({ field }) => (
                  <FormItem className="otp-field-container">
                    <FormLabel className="text-sm font-semibold">رمز التحقق</FormLabel>
                    <div className="ltr" style={{ direction: 'ltr' }}>
                      <FormControl>
                        <InputOTP maxLength={4} {...field} className="otp-input-wrapper">
                          <InputOTPGroup className="otp-group">
                            <InputOTPSlot index={0} className="otp-slot" />
                            <InputOTPSlot index={1} className="otp-slot" />
                            <InputOTPSlot index={2} className="otp-slot" />
                            <InputOTPSlot index={3} className="otp-slot" />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="h-12  bg-main-blue w-full  text-white  hover:bg-main-purple transation-all duration-300  rounded-full flex items-center gap-14"> تحقيق </Button>
              <div className="flex items-center justify-center gap-2">
                <div className="w-full h-[2px] bg-body"></div>
                <p className="text-xs font-bold shrink-0"> لم تصلك الرسالة بعد؟ </p>
                <div className="w-full h-[2px] bg-body"></div>
              </div>

              <div className="space-y-3">

                <Button
                  className="group h-12 px-6 text-white  bg-main-blue hover:bg-main-purple transtion-all duration-300 w-full text-xs font-bold   rounded-full flex items-center justify-between  hover:text-white  "
                  onClick={resendOtp}
                  disabled={loading}
                >
                  إعادة إرسال
                  <FaCommentSms size={20} className="text-white" />
                </Button>
              </div>
            </form>
          </Form>
      }
    </>
  )
}

export default VerfiyOtp
