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
// validation
const formSchema = z.object({
  phone: z.string().nonempty("هذا الحقل مطلوب"),
})

const SendOtp = ({handleSendOtp}) => {
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  })
  // 2. Define a submit handler.
  function onSubmit(values) {
    handleSendOtp(values.phone)
    console.log(values)
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
        {/* Phone Field */}
        <div>
          <FormField
            control={form.control}
            name="phone"
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

        <Button type="submit" className="h-12  bg-main-blue w-full m-auto text-white border-2 border-main-blue hover:bg-white hover:text-main-blue rounded-full flex items-center gap-14">
          متـــابعة
        </Button>
      </form>
    </Form>
  )
}

export default SendOtp
