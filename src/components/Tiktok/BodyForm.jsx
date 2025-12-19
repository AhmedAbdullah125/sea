import director from "../../../public/app/poeple1.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import meet from "../../../public/app/meet.svg";
import waicon from "../../../public/app/waicon.svg";
import blueRial from "../../../public/app/blueRial.svg";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

const schema = z
    .object({
        arrivalDate: z.coerce.date({ errorMap: () => ({ message: "يرجى اختيار تاريخ القدوم" }) }),
        departureDate: z.coerce.date({ errorMap: () => ({ message: "يرجى اختيار تاريخ المغادرة" }) }),
        guests: z.string().nonempty("يرجى اختيار عدد الضيوف"),
        accommodation: z.string().nonempty("يرجى اختيار نوع السكن"),
    })
    .refine((v) => v.departureDate >= v.arrivalDate, {
        path: ["departureDate"],
        message: "تاريخ المغادرة يجب أن يكون بعد/يساوي تاريخ القدوم",
    });

export default function BodyForm() {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            arrivalDate: "",
            departureDate: "",
            guests: "",
            accommodation: "",
        },
    });

    const arrivalDate = form.watch("arrivalDate");

    function onSubmit(values) {
        console.log("BodyForm submit:", values);
    }

    return (
        <div className="tiktok-body-form" dir="rtl">
            <div className="tiktok-body-form__card">

                <div className="tiktok-body-form__content">
                    <div className="tiktok-body-form__header">
                        <div className="tiktok-body-form__hint">فريقنا جاهز يرد عليك بأسرع وقت</div>
                        <div className="tiktok-body-form__title">عنـــــــــــــــــدك استفســار !</div>
                        <div className="flex items-center gap-1">

                            <div className="tiktok-body-form__support">
                                <div>فريق الدعم متواجد من الأحد إلى الخميس</div>
                                <div>ابتداء من الساعة 9:00 صباحاً وحتى 5:00 مساءً</div>
                            </div>
                            <div className="tiktok-body-form__contacts">
                                <button
                                    className="tiktok-body-form__contact tiktok-body-form__contact--avatar"
                                    type="button"
                                    aria-label="Support"
                                >
                                    <img src={director} alt="Support" />
                                </button>

                                <button className="tiktok-body-form__contact" type="button" aria-label="Google Meet">
                                    <LazyLoadImage src={meet} alt="Google Meet" />
                                </button>
                                <button className="tiktok-body-form__contact" type="button" aria-label="WhatsApp">
                                    <LazyLoadImage src={waicon} alt="WhatsApp" />
                                </button>

                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 justify-between">
                        <div className="tiktok-body-form__price">
                            <div className="tiktok-body-form__price-box">
                                <div className="tiktok-body-form__price-row">
                                    <span className="tiktok-body-form__price-old">999.00</span>

                                    <span className="tiktok-body-form__price-new">
                                        692.00
                                        <img className="tiktok-body-form__rial" src={blueRial} alt="" />
                                    </span>

                                    <span className="tiktok-body-form__unit">/ الليلة الواحدة</span>
                                </div>

                            </div>

                            <div className="tiktok-body-form__price-sub">إجمالي لليلة واحدة 692.00 ر.س</div>
                        </div>

                        <div className="tiktok-body-form__discount">
                            <span>خصم</span>
                            <span className="tiktok-body-form__discount-value">20%</span>
                        </div>

                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="tiktok-body-form__fields">
                                <FormField
                                    control={form.control}
                                    name="arrivalDate"
                                    render={({ field }) => (
                                        <FormItem className="tiktok-body-form__field">
                                            <div className="tiktok-body-form__label">
                                                <span className="tiktok-body-form__label-icon" aria-hidden="true">
                                                    📅
                                                </span>
                                                <span>تاريخ القدوم</span>
                                            </div>

                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button type="button" className="tiktok-body-form__select" variant="outline">
                                                            <span className="tiktok-body-form__select-value">
                                                                {field.value ? format(field.value, "yyyy / MM / dd") : "مثلاً 22 / 05 / 2025..."}
                                                            </span>

                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>

                                                <PopoverContent className="w-auto p-0 bg-white" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        fromDate={new Date()}
                                                    />
                                                </PopoverContent>
                                            </Popover>

                                            <FormMessage className="text-red-500 text-xs" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="departureDate"
                                    render={({ field }) => (
                                        <FormItem className="tiktok-body-form__field">
                                            <div className="tiktok-body-form__label">
                                                <span className="tiktok-body-form__label-icon" aria-hidden="true">
                                                    📅
                                                </span>
                                                <span>تاريخ المغادرة</span>
                                            </div>

                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            type="button"
                                                            className="tiktok-body-form__select"
                                                            variant="outline"
                                                            disabled={!arrivalDate}
                                                        >
                                                            <span className="tiktok-body-form__select-value">
                                                                {field.value ? format(field.value, "yyyy / MM / dd") : "مثلاً 22 / 05 / 2025..."}
                                                            </span>

                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>

                                                <PopoverContent className="w-auto p-0 bg-white" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        fromDate={arrivalDate || new Date()}
                                                    />
                                                </PopoverContent>
                                            </Popover>

                                            <FormMessage className="text-red-500 text-xs" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="guests"
                                    render={({ field }) => (
                                        <FormItem className="tiktok-body-form__field">
                                            <div className="tiktok-body-form__label">
                                                <span className="tiktok-body-form__label-icon" aria-hidden="true">
                                                    📅
                                                </span>
                                                <span>عدد الضيوف أو الأشخاص</span>
                                            </div>

                                            <Select dir="rtl" onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="tiktok-body-form__select">
                                                        <SelectValue placeholder="مثلاً 2 بالغين..." />

                                                    </SelectTrigger>
                                                </FormControl>

                                                <SelectContent className="bg-white">
                                                    <SelectItem value="1">1</SelectItem>
                                                    <SelectItem value="2">2</SelectItem>
                                                    <SelectItem value="3">3</SelectItem>
                                                    <SelectItem value="4">4</SelectItem>
                                                    <SelectItem value="5">5+</SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <FormMessage className="text-red-500 text-xs" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="accommodation"
                                    render={({ field }) => (
                                        <FormItem className="tiktok-body-form__field">
                                            <div className="tiktok-body-form__label">
                                                <span className="tiktok-body-form__label-icon" aria-hidden="true">
                                                    📅
                                                </span>
                                                <span>نوع السكن</span>
                                            </div>

                                            <Select dir="rtl" onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="tiktok-body-form__select">
                                                        <SelectValue placeholder="مثلاً فندق..." />

                                                    </SelectTrigger>
                                                </FormControl>

                                                <SelectContent className="bg-white">
                                                    <SelectItem value="hotel">فندق</SelectItem>
                                                    <SelectItem value="apartment">شقق فندقية</SelectItem>
                                                    <SelectItem value="villa">فيلا</SelectItem>
                                                    <SelectItem value="chalet">شاليه</SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <FormMessage className="text-red-500 text-xs" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <button className="tiktok-body-form__cta" type="submit">
                                <span>احصل على سعــرك الآن</span>
                                <span className="tiktok-body-form__cta-icon" aria-hidden="true">
                                    ⏱
                                </span>
                            </button>
                        </form>
                    </Form>
                </div>

                <div className="tiktok-body-form__brand">
                    <div className="tiktok-body-form__brand-text">
                        <span>قم بزيارة موقعنا الإلكتروني</span>
                        <span className="tiktok-body-form__brand-arrow">‹</span>
                    </div>

                    <div className="tiktok-body-form__brand-domain">Seatourism.sa</div>
                </div>


            </div>
        </div>
    );
}