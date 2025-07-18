import React, { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FaCalendarDays, FaCommentDollar } from "react-icons/fa6";
import { ChevronDown } from "lucide-react"
import { BsFillSendFill } from "react-icons/bs";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../lib/apiConfig";
import axios from "axios";
import { bookHotel } from "./bookHotelF";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";

export const filterSchema = z.object({
    date: z.date({
        required_error: "تاريخ الوصول مطلوب",
        invalid_type_error: "تاريخ غير صالح",
    }),
    dateLeave: z.date({
        required_error: "تاريخ المغادرة مطلوب",
        invalid_type_error: "تاريخ غير صالح",
    }),
    visitors: z.string({
        required_error: "عدد الضيوف مطلوب",
        invalid_type_error: "عدد الضيوف يجب أن يكون نصًا",
    }),
});
const HotelPayment = ({ data }) => {
    console.log(data);
    const form = useForm({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            date: undefined,
            dateLeave: undefined,
            visitors: "1",
        },
    });
    const { watch } = form;
    const arrivalDate = watch("date");
    const departureDate = watch("dateLeave");

    const [settings, setSettings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [days, setDays] = useState(0);
    const [displayPrice, setDisplayPrice] = useState(false);
    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/settings`);
                setSettings(response.data.data);
            } catch (error) {
                console.error('Error retrieving data:', error);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    // 🔢 Calculate number of days between dates
    useEffect(() => {
        if (arrivalDate && departureDate) {
            const diffTime = new Date(departureDate) - new Date(arrivalDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDays(diffDays > 0 ? diffDays : 0); // prevent negative
        } else {
            setDays(0);
        }
    }, [arrivalDate, departureDate]);

    const onSubmit = (values) => {
        if (!sessionStorage.getItem('token')) {
            toast.error('يرجى تسجيل الدخول قبل الحفظ');
            window.location.href = '/login';
            return;
        }
        console.log("Form values:", values);
        handleBookHotel(values, data.id);
    };
    const handleBookHotel = async (data, id) => {
        await bookHotel(data, setLoading, id);
    };
    const pricePerNight = Number(data?.price) || 0;
    const totalPrice = pricePerNight * days;

    return (
        <section className='hotel-payment-section'>
            <div className="price-discount">
                <div className="r-side">
                    <p className='price-details'>
                        <span className='old-price'>
                            {pricePerNight * (Number(data.discount) + 100) / 100}
                        </span>
                        <span className='new-price'>
                            {pricePerNight}
                        </span>
                        <div className="rs-t">
                            <span className='icon-saudi_riyal'></span> / لليلة الواحــــدة
                        </div>
                    </p>
                    <p className='total-price'>إجمالي ليلة واحدة {pricePerNight.toFixed(2)} ر.س</p>
                </div>
                <div className="l-side">
                    <span className='discount'>
                        خصم %{Number(data?.discount).toFixed(0) || 0}
                    </span>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 my-10">
                    <div className="hotel-payment-grid">
                        {/* Arrival Date */}
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="w-full flex flex-col">
                                    <FormLabel className="flex items-center gap-1">
                                        <FaCalendarDays size={16} className="text-main-purple" />
                                        <p className="text-main-blue font-bold text-sm">تـــاريخ الوصــــول</p>
                                    </FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant="outline" className={cn("bg-white h-12 w-full px-3 font-xs font-semibold text-main-gray rounded-full border-none hover:bg-body flex items-center justify-between", !field.value && "text-muted-foreground")}>
                                                    {field.value ? format(field.value, "PPP") : <span className="text-[#797979] text-xs font-semibold">مثل 22 / 05 / 2025. 10: 48 صباحا </span>}
                                                    <div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full"><ChevronDown size={14} /></div>
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0 bg-white rounded-xl border-none shadow-md" align="start">
                                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} className="w-full" />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage className="text-red-500 text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* Departure Date */}
                        <FormField
                            control={form.control}
                            name="dateLeave"
                            render={({ field }) => (
                                <FormItem className="w-full flex flex-col">
                                    <FormLabel className="flex items-center gap-1">
                                        <FaCalendarDays size={16} className="text-main-purple" />
                                        <p className="text-main-blue font-bold text-sm">تـــاريخ المغادرة</p>
                                    </FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant="outline" className={cn("bg-white h-12 w-full px-3 font-xs font-semibold text-main-gray rounded-full border-none hover:bg-body flex items-center justify-between", !field.value && "text-muted-foreground")}>
                                                    {field.value ? format(field.value, "PPP") : <span className="text-[#797979] text-xs font-semibold">مثل 22 / 05 / 2025. 10: 48 صباحا </span>}
                                                    <div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full"><ChevronDown size={14} /></div>
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0 bg-white rounded-xl border-none shadow-md" align="start">
                                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} className="w-full" />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage className="text-red-500 text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* Visitors */}
                        <FormField
                            control={form.control}
                            name="visitors"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="flex items-center gap-1">
                                        <BsFillSendFill size={16} className="text-main-purple" />
                                        <p className="text-main-blue font-bold text-sm">عدد الضيوف أو الاشخـــاص</p>
                                    </FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange} dir="rtl" className="bg-white">
                                        <FormControl>
                                            <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full"><ChevronDown size={14} /></div>} className="bg-white text-[#797979] text-xs font-semibold border-none rounded-full h-12">
                                                <SelectValue placeholder="إدخـــال نقطة الانطلاق من هنــا..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="shadow border-none rounded-xl bg-white">
                                            {Array.from({ length: 10 }, (_, i) => (
                                                <SelectItem key={i} value={String(i + 1)} className="cursor-pointer focus:bg-body rounded-xl">
                                                    {i + 1}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        {/* WhatsApp Link */}
                        {
                            days > 0 && !displayPrice ?
                                < button className="offerLink" to={`https://wa.me/${settings.whatsapp}?text= اريد مناقشتكم عن عرض سعر علي فندق  ${data?.title}`}
                                    onClick={() =>
                                        setDisplayPrice(true)
                                    }
                                >
                                    <span className="text-[#A71755] font-semibold text-sm">اظهــار الســعر الان</span>
                                    <FaCommentDollar />
                                </button> : null
                        }

                        {/* Payment Details */}
                        <div className="payment-details" style={displayPrice ? { display: "block" } : { display: "none" }}>
                            <div className="linee">
                                <div className="key">
                                    {days > 0 ? `عدد الليالي (${days})× ${pricePerNight} ريال` : "ليلة واحدة"}
                                </div>
                                <div className="value">
                                    {totalPrice.toFixed(2)} ريال
                                </div>
                            </div>
                            <div className="linee">
                                <div className="key">
                                    خصم من العروض
                                </div>
                                <div className="value">
                                    {Number(data.discount) / 100 * totalPrice} ريال
                                </div>
                            </div>
                            <div className="linee">
                                <div className="key">
                                    رسوم الخدمة
                                </div>
                                <div className="value">
                                    12 ريال
                                </div>
                            </div>
                            <div className="hagez"></div>
                            <div className="linee total-line">
                                <div className="key">الإجمالي</div>
                                <div className="value">{totalPrice.toFixed(2)} ريال</div>
                            </div>
                        </div>
                        {/* <AlertDialog style={{ direction: "rtl" }}>
                            <AlertDialogTrigger asChild>
                                <button className="flex-shrink-0 h-12 py-0 px-9  bg-[#A71755] text-white hover:text-red-500 font-semibold flex items-center justify-center rounded-full">
                                    احجز الان
                                </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="w-full  bg-white  border-none shadow-md max-w-[500px] p-10 rounded-3xl sm:rounded-3xl">
                                <AlertDialogHeader className="flex flex-col gap-4">
                                    <AlertDialogTitle className="text-center"> اختر طريقه  الحجز التي تناسبك</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        <div className="flex gap-3">
                                            <label htmlFor="submit" type="submit" className="flex-shrink-0 h-12 py-0 px-9  bg-[#A71755] text-white hover:text-red-500 font-semibold flex items-center justify-center rounded-full">
                                                احجز الان
                                            </label>

                                            <Link className="flex-shrink-0 h-12 py-0 px-9  bg-[#29b62a] text-white hover:text-main-blue font-semibold flex items-center justify-center rounded-full" to={`https://wa.me/${settings.whatsapp}?text= اريد مناقشتكم عن عرض سعر علي فندق  ${data?.title}`}>
                                                <span >حجز عن طريق الواتساب </span>
                                            </Link>
                                        </div>

                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog> */}

                        {/* Submit */}
                        <div className="flex gap-3 flex-wrap">
                            <button htmlFor="submit" type="submit" className="flex-shrink-0 h-12 py-0 px-9  bg-[#A71755] text-white hover:text-red-500 font-semibold flex items-center justify-center rounded-full">
                                احجز الان
                            </button>
                            <Link
                                className="flex-shrink-0 h-12 py-0 px-9  bg-[#29b62a] text-white hover:text-main-blue font-semibold flex items-center justify-center rounded-full"
                                to={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
                                    `اريد مناقشتكم عن عرض سعر على فندق "${data?.title}"\n` +
                                    `من يوم ${arrivalDate ? format(arrivalDate, "yyyy-MM-dd") : "?"} ` +
                                    `إلى يوم ${departureDate ? format(departureDate, "yyyy-MM-dd") : "?"} \n` +
                                    `عدد الضيوف: ${form.watch("visitors") || "?"}`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span>حجز عن طريق الواتساب</span>
                            </Link>


                        </div>
                    </div>
                </form>
            </Form>
        </section >
    );
};

export default HotelPayment;
