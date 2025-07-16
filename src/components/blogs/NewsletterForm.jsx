import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import CustomInput from "../home/filterTabs/CustomInput"
import { MdArrowBackIosNew } from "react-icons/md"
import { postToApi } from "../../api/utils/postData"
import { toast } from "sonner"
import { Loader } from "lucide-react"


// validation
const formSchema = z.object({
  name: z.string().nonempty("هذا الحقل مطلوب"),
  email: z.string().email("ادخل بريد صحيح").nonempty("هذا الحقل مطلوب"),
})
const NewsletterForm = ({ id }) => {
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })
  const { isSubmitting } = form.formState
  async function onSubmit(values) {
    const final = {
      ...values,
      news_letters_id: id
    }
    const res = await postToApi("/newsletters/subscribe", final)
    if (res?.status == 200) {
      toast.success("تم التسجيل بنجاح")
    }
    else if (res?.status == 422) {
      toast.error("هذا البريد مستخدم بالفعل")
    }
    else {
      toast.error("حدث خطأ ما")
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-2 grid grid-cols-12 gap-4 items-end">
        <CustomInput form={form} name={"name"} label={"اسمك الأول، بالعربية"} isRequired placeholder="أدخل اسمك الأول، بالعربية هنــا ..." type="text" colSpan={"xl:col-span-5 col-span-12"} bg="bg-white" />
        <CustomInput form={form} name={"email"} label={"بريدك المفضل"} isRequired placeholder="أدخل بريدك المفضل هنــا ..." type="email" colSpan={"xl:col-span-5 col-span-12"} bg="bg-white" />
        <Button type="submit" className="h-12  bg-main-purple  text-white  hover:bg-main-blue transition-all duration-300  rounded-full flex items-center justify-between col-span-12 xl:col-span-2">
          {isSubmitting ? <Loader size={20} className="animate-spin mx-auto" /> :
            <>
              تابعنا الآن
              <MdArrowBackIosNew size={24} />
            </>
          }
        </Button>
      </form>
    </Form>
  )
}

export default NewsletterForm
