import { FaPassport } from "react-icons/fa6";
import { TbFaceId } from "react-icons/tb";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronDown } from "lucide-react"
import { passportTypes } from "../../data/visa"
import CustomFilterSelect from "../home/filterTabs/CustomFilterSelect"
import CustomInput from "../home/filterTabs/CustomInput"
import { Input } from "@/components/ui/input";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Checkbox } from "@/components/ui/checkbox"
import { useContext, useEffect, useState } from "react"
import CustomDatePicker from "../home/filterTabs/CustomDatePicker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useQuery } from "@tanstack/react-query";
import { fetchFromApi } from "../../api/utils/fetchData";
import { postToApi } from "../../api/utils/postData";
import { userContext } from "../../context/UserContext";
import { toast } from "sonner";

// validation
const formSchema = z.object({
  visa_id: z.string().nonempty("هذا الحقل مطلوب"),
  passport_country: z.string().nonempty("هذا الحقل مطلوب"),
  passport_number: z.string().nonempty("هذا الحقل مطلوب"),
  passport_type: z.string().nonempty("هذا الحقل مطلوب"),
  travel_from: z.string().nonempty("هذا الحقل مطلوب"),
  traveler_name: z.string().nonempty("هذا الحقل مطلوب"),
  email: z.string().nonempty("هذا الحقل مطلوب"),
  phone: z.string().nonempty("هذا الحقل مطلوب"),
  face_image: z.custom((val) => val instanceof File && val.size > 0, {
    message: "يرجى رفع صورة الوجه",
  }),

  passport_copy: z.custom((val) => val instanceof File && val.size > 0, {
    message: "يرجى رفع صورة جواز السفر",
  }),
  arrival_date: z.coerce.date({
    errorMap: () => ({ message: "يرجى إدخال تاريخ وصول صالح" }),
  }),
  passport_expiry_date: z.coerce.date({
    errorMap: () => ({ message: "يرجى إدخال تاريخ انتهاء صالح" }),
  }),
  job: z.string().nonempty("هذا الحقل مطلوب"),
  visit_reason: z.enum(["أخرى", "سائح", "الأعمال التجارية"], {
    required_error: "هذا الحقل مطلوب",
  }),
  processing_type: z.enum(["سريع (24 إلى 36 ساعة)", "عادي (3 إلى 4 أيام)"], {
    required_error: "هذا الحقل مطلوب",
  }),
})

const VisaForm = () => {
  const { token } = useContext(userContext);
  // picture privwer
  const [picturePreview, setPicturePreview] = useState(null);
  const [passportPdf, setPassportPdfPreview] = useState(null);



  // visa 
  const { data: visa } = useQuery({
    queryKey: ['visa'],
    queryFn: async () => {
      const res = await fetchFromApi("/travel-visa");
      return res;
    }
  })
  // visa 
  const { data: counts } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const res = await fetchFromApi("/countries");
      return res;
    }
  })
  const countries = counts?.data?.data.map((item) => ({
    label: item?.name,
    value: String(item?.id),
  }));


  const handlePictureChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPicturePreview(previewUrl);
      form.setValue("face_image", file, { shouldValidate: true });
    }
  };
  const handlePassportPdf = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPassportPdfPreview(previewUrl);
      form.setValue("passport_copy", file, { shouldValidate: true });
    }
  };

  // formate date
  function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // YYYY-MM-DD format
  }

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      visa_id: "",
      passport_country: "",
      passport_number: "",
      passport_type: "",
      travel_from: "",
      traveler_name: "",
      email: "",
      phone: "",
      job: "",
    },
  })
  // 2. Define a submit handler.
  // In your onSubmit function, modify the file handling:
  async function onSubmit(values) {
    // Check if files exist and are valid
    if (!(values.face_image instanceof File) || values.face_image.size === 0) {
      form.setError("face_image", { message: "يرجى رفع صورة الوجه" });
      return;
    }

    if (!(values.passport_copy instanceof File) || values.passport_copy.size === 0) {
      form.setError("passport_copy", { message: "يرجى رفع نسخة جواز السفر" });
      return;
    }

    const formData = new FormData();

    // Append all text fields
    Object.keys(values).forEach(key => {
      if (key !== "face_image" && key !== "passport_copy" && key !== "arrival_date" && key !== "passport_expiry_date") {
        formData.append(key, values[key]);
      }
    });

    // Append dates with proper formatting
    formData.append('arrival_date', formatDate(values.arrival_date));
    formData.append('passport_expiry_date', formatDate(values.passport_expiry_date));

    // Append files with explicit field names
    formData.append('face_image', values.face_image, 'face_image.jpg');
    formData.append('passport_copy', values.passport_copy, 'passport_copy.pdf');

    try {
      const res = await postToApi("visa-booking", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Explicitly set content type
        }
      });
      console.log(res);
      if (res.status === 201) {
        toast.success("تم إرسال الطلب بنجاح");
        form.reset();
      }
      else {
        toast.error("حدث خطأ في إرسال الطلب");
      }
    } catch (error) {
      console.error("Submission error:", error);
      // Handle error (e.g., show error message to user)
    }
  }
  return (
    <section className="mt-16 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-2 grid grid-cols-12 gap-4">
          {/* part one  */}
          <div className="col-span-12 xl:col-span-6 grid grid-cols-12 gap-x-2 gap-y-4 ">
            {/* type */}
            <FormField
              control={form.control}
              name={"visa_id"}
              render={({ field }) => {
                const selectedVisa = visa?.data?.data?.find((option) => String(option?.id) === field.value)
                return (
                  <FormItem className={`col-span-12 `}>
                    <FormLabel className="flex items-center gap-1">
                      <p className="text-main-blue font-bold text-sm">
                        نوع التأشيرة
                        <span className="text-red-500">*</span>
                      </p>
                    </FormLabel>
                    <div className="flex items-center gap-2">
                      <Select dir="rtl" onValueChange={field.onChange} defaultValue={field.value} >
                        <FormControl>
                          <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                            <ChevronDown size={14} />
                          </div>} className="h-12 bg-body text-[#797979]  text-xs font-semibold border-none  rounded-full">
                            <SelectValue placeholder={"نوع التأشيرة"} className="text-[#797979]" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className=" shadow border-none rounded-xl bg-white  ">
                          {visa?.data?.data?.map((option) => (
                            <SelectItem key={option?.id} value={String(option?.id)} className=" cursor-pointer focus:bg-body rounded-xl">
                              {option?.period}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span className="h-12 w-20 shrink-0 bg-main-navy rounded-full flex flex-col  items-center justify-center text-white text-[10px] font-semibold">
                        {selectedVisa ? <>
                          <p>
                            {parseInt(selectedVisa.price)}
                          </p>
                          <p>
                            {selectedVisa.currencyName}
                          </p>
                        </>
                          : null}
                      </span>
                    </div>
                    <FormMessage className="text-red-500  text-xs " />
                  </FormItem>
                )
              }}
            />
            {/* countrey */}
            <CustomFilterSelect form={form} name={"passport_country"} label={"بلد جواز السفر"} isRequired options={countries} placeholder="بلد جواز السفر" colSpan={"col-span-12"} />
            {/* passport number */}
            <CustomInput form={form} name={"passport_number"} label={"رقم جواز السفر"} isRequired placeholder="0000-000000" type="number" colSpan={"xl:col-span-6 col-span-12"} />
            {/* passport type */}
            <CustomFilterSelect form={form} name={"passport_type"} label={"نوع جواز السفر"} isRequired options={passportTypes} placeholder="اختر نوع جواز سفرك" colSpan={"xl:col-span-6 col-span-12"} />
            {/* countrey from */}
            <CustomFilterSelect form={form} name={"travel_from"} label={"أنا مسافر من"} isRequired options={countries} placeholder="اختر البلد" colSpan={"col-span-12"} />
            {/* name */}
            <CustomInput form={form} name={"traveler_name"} label={"اسم المسافر"} isRequired placeholder="أكتب اسم المسافر" colSpan={" col-span-12"} />
            {/* email */}
            <CustomInput form={form} name={"email"} label={"عنوان البريد الإلكتروني (ستتلقى التأشيرة على هذا البريد الإلكتروني)"} isRequired placeholder="أكتب البريد الالكتروني هنا" colSpan={" col-span-12"} />
            {/* Phone Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="col-span-12" dir="ltr">
                  <FormLabel className="block" dir="rtl" >
                    <p className="text-main-blue font-bold text-sm">
                      رقم الاتصال
                      <span className="text-red-500">*</span>
                    </p>
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      placeholder="أدخل رقم الهاتف"
                      value={field.value}
                      onChange={field.onChange}
                      defaultCountry="SA"
                      className="custom-phone-input"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500  text-xs text-end" />
                </FormItem>
              )}
            />
            <div className="col-span-12 max-xl:hidden">
              {/* check */}
              <div className="flex items-center gap-3  my-8">
                <Checkbox id="terms" className=" bg-body rounded
                        data-[state=checked]:bg-main-blue
                        data-[state=checked]:text-white
                        data-[state=checked]:border-main-blue" />
                <label
                  htmlFor="terms"
                  className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  بالنقر فوق <span className="font-bold">"تقديم الطلب"</span>، فإنك توافق على <span className="font-bold">الشروط والأحكام وسياسة الخصوصية</span>               </label>
              </div>
              <Button type="submit" className="h-12  bg-main-purple w-full m-auto text-white  hover:bg-main-blue transition-all duration-300  rounded-full flex items-center gap-14">بحـــــث

                قدم طلبك الآن
              </Button>
            </div>
          </div>
          {/* part two */}
          <div className="bg-body p-8 rounded-[50px] col-span-12 xl:col-span-6">
            <h3 className="text-main-navy text-xs font-bold mb-6">إرفاق الملفـــات</h3>
            <div className="grid grid-cols-12 gap-x-4 gap-y-6">
              {/* picture Field */}
              <FormField
                control={form.control}
                name="face_image"
                render={({ field }) => (
                  <FormItem className="md:col-span-6 col-span-12" dir="ltr">
                    <FormLabel className="flex items-center justify-center bg-white h-60 rounded-[40px]" dir="rtl" htmlFor="picture">
                      {picturePreview ?
                        <img
                          src={picturePreview}
                          alt="picture"
                          width={150}
                          height={150}
                          className="object-cover rounded-full"
                        /> :
                        <div className="h-full flex flex-col justify-center items-center">
                          <div className="mb-8 border size-14 rounded-full flex items-center justify-center">
                            <TbFaceId size={24} className="text-main-navy" />
                          </div>
                          <p className="text-main-blue font-bold text-xs">
                            صورة الوجه (بدون نظارات)
                            <span className="text-red-500">*</span>
                          </p>
                          <p className="text-xs text-main-gray mt-2">* png - jpeg *</p>
                        </div>}
                    </FormLabel>
                    <FormControl>
                      <Input accept="image/png, image/jpeg" id="picture" type="file" className="hidden"
                        onChange={handlePictureChange} />
                    </FormControl>
                    <FormMessage className="text-red-500  text-xs text-end" />
                  </FormItem>
                )}
              />
              {/* passportPdf Field */}
              <FormField
                control={form.control}
                name="passport_copy"
                render={({ field }) => (
                  <FormItem className="md:col-span-6 col-span-12" dir="ltr">
                    <FormLabel className="flex items-center justify-center bg-white h-60 rounded-[40px]" dir="rtl" htmlFor="passportPdf">
                      {passportPdf ?
                        <iframe
                          src={passportPdf}
                          title="PassportPdf Preview"
                          width="50%"
                          height="50%"
                          className="rounded-md"
                        /> :
                        <div className="h-full flex flex-col justify-center items-center">
                          <div className="mb-8 border size-14 rounded-full flex items-center justify-center">
                            <FaPassport size={24} className="text-main-navy" />

                          </div>
                          <p className="text-main-blue font-bold text-xs">
                            نسخة جواز السفر
                            <span className="text-red-500">*</span>
                          </p>
                          <p className="text-xs text-main-gray mt-2">* pdf *</p>
                        </div>}
                    </FormLabel>
                    <FormControl>
                      <Input id="passportPdf" type="file" className="hidden"
                        onChange={handlePassportPdf} />
                    </FormControl>
                    <FormMessage className="text-red-500  text-xs text-end" />
                  </FormItem>
                )}
              />
              {/* arrival date  */}
              <CustomDatePicker colSpan="col-span-12 xl:col-span-6" isRequired name="arrival_date" label="تاريخ الوصول" form={form} placeholder="اختر تاريخ الوصول" bg="bg-white hover:bg-white" />
              {/* expiry date  */}
              <CustomDatePicker colSpan="col-span-12 xl:col-span-6" isRequired name="passport_expiry_date" label="تاريخ انتهاء صلاحية جواز السفر " form={form} placeholder="أكتب تاريخ انتهاء صلاحية جواز السفر" bg="bg-white hover:bg-white" />
              {/* job */}
              <CustomInput bg="bg-white" form={form} name={"job"} label={"المهنة "} isRequired placeholder="أكتب المهنة هنا" colSpan={" col-span-12"} />
              {/* reason */}
              <FormField
                control={form.control}
                name="visit_reason"
                render={({ field }) => (
                  <FormItem className="space-y-1 col-span-12" dir="rtl">
                    <FormLabel>
                      <p className="text-main-blue font-bold text-sm">
                        سبب الزيارة
                        <span className="text-red-500">*</span>
                      </p>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        dir="rtl"
                        onValueChange={field.onChange}
                        value={field.value} // controlled value
                        className="flex items-center p-0"
                      >
                        <FormItem className="w-1/3">
                          <FormControl>
                            <RadioGroupItem className="hidden" value="الأعمال التجارية" />
                          </FormControl>
                          <FormLabel
                            className={`w-full rounded-full border h-10 text-xs font-semibold flex items-center justify-center
                ${field.value === "الأعمال التجارية" ? "bg-main-purple text-white" : "bg-white text-main-gray"}
              `}
                          >
                            الأعمال التجارية
                          </FormLabel>
                        </FormItem>
                        <FormItem className="w-1/3">
                          <FormControl>
                            <RadioGroupItem className="hidden" value="سائح" />
                          </FormControl>
                          <FormLabel
                            className={`w-full rounded-full border h-10 text-xs font-semibold flex items-center justify-center
                ${field.value === "سائح" ? "bg-main-purple text-white" : "bg-white text-main-gray"}
              `}
                          >
                            سائح
                          </FormLabel>
                        </FormItem>
                        <FormItem className="w-1/3">
                          <FormControl>
                            <RadioGroupItem className="hidden" value="أخرى" />
                          </FormControl>
                          <FormLabel
                            className={`w-full rounded-full border h-10 text-xs font-semibold flex items-center justify-center
                ${field.value === "أخرى" ? "bg-main-purple text-white" : "bg-white text-main-gray"}
              `}
                          >
                            أخرى
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              {/* treatment type */}
              <FormField
                control={form.control}
                name="processing_type"
                render={({ field }) => (
                  <FormItem className="space-y-1 col-span-12" dir="rtl">
                    <FormLabel>
                      <p className="text-main-blue font-bold text-sm">
                        نوع المعالجة
                        <span className="text-red-500">*</span>
                      </p>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        dir="rtl"
                        onValueChange={field.onChange}
                        value={field.value}  // use controlled value
                        className="flex items-center p-0"
                      >
                        <FormItem className="w-1/2">
                          <FormControl>
                            <RadioGroupItem className="hidden" value="سريع (24 إلى 36 ساعة)" />
                          </FormControl>
                          <FormLabel
                            className={`w-full rounded-full border h-10 text-xs font-semibold flex items-center justify-center
                ${field.value === "سريع (24 إلى 36 ساعة)" ? "bg-main-purple text-white" : "bg-white text-main-gray"}
              `}
                          >
                            سريع (24 إلى 36 ساعة)
                          </FormLabel>
                        </FormItem>

                        <FormItem className="w-1/2">
                          <FormControl>
                            <RadioGroupItem className="hidden" value="عادي (3 إلى 4 أيام)" />
                          </FormControl>
                          <FormLabel
                            className={`w-full rounded-full border h-10 text-xs font-semibold flex items-center justify-center
                ${field.value === "عادي (3 إلى 4 أيام)" ? "bg-main-purple text-white" : "bg-white text-main-gray"}
              `}
                          >
                            عادي (3 إلى 4 أيام)
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

            </div>
            <p className="text-main-gray text-xs font-semibold mt-4">* سيتم تحصيل 40 دولاراً إضافياً مقابل المعالجة السريعة.</p>
          </div>
          <div className="col-span-12 xl:hidden">
            {/* check */}
            <div className="flex items-center gap-3  my-8">
              <Checkbox id="terms" className=" bg-body rounded
                        data-[state=checked]:bg-main-blue
                        data-[state=checked]:text-white
                        data-[state=checked]:border-main-blue" />
              <label
                htmlFor="terms"
                className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                بالنقر فوق <span className="font-bold">"تقديم الطلب"</span>، فإنك توافق على <span className="font-bold">الشروط والأحكام وسياسة الخصوصية</span>               </label>
            </div>
            <Button type="submit" className="h-12  bg-main-purple w-full m-auto text-white  hover:bg-main-blue transition-all duration-300  rounded-full flex items-center gap-14">بحـــــث

              قدم طلبك الآن
            </Button>
          </div>

        </form>
      </Form>

    </section>
  )
}

export default VisaForm
