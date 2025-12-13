import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useState } from "react"
import Loading from "../loading/Loading"
import { forgetPassword } from "./forgetPassword"

// validation
const formSchema = z.object({
  email: z.string().nonempty("هذا الحقل مطلوب"),
})
const ForgetPasswordPage= ({ handleSendOtp }) => {
  const [loading, setLoading] = useState(false)
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })
  // 2. Define a submit handler.
  async function onSubmit(values) {
    forgetPassword(values, setLoading, handleSendOtp)

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
              </div>
              <div className="space-y-4">
                <Button
                  type="submit"
                  className="h-12 px-6 text-white text-center  bg-main-blue hover:bg-main-purple transtion-all duration-300 w-full text-xs font-bold  justify-center rounded-full flex items-center  hover:text-white  ">
                  ارسال
                </Button>
              </div>

            </form>
          </Form>
      }
    </>
  )
}

export default ForgetPasswordPage;
