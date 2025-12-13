import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import rial from "../../../public/app/rial.svg";
// Zod validation schema
const publishDetailsSchema = z.object({
    title: z.string().min(3, "العنوان يجب أن يكون 3 أحرف على الأقل"),
    highlight: z.string().min(10, "الوصف يجب أن يكون 10 أحرف على الأقل").max(500, "الوصف يجب أن لا يتجاوز 500 حرف"),
    contactType: z.enum(["whatsapp", "sea", "ai"], {
        required_error: "نوع الحجز مطلوب",
    }),
    priceNight: z.coerce.number().min(1, "السعر لليلة مطلوب"),
    priceWeek: z.coerce.number().min(1, "السعر للأسبوع مطلوب"),
    priceMonth: z.coerce.number().min(1, "السعر للشهر مطلوب"),
});

const PublishDetails = ({ formData, setFormData, setStepDone }) => {
    const isInitialMount = useRef(true);
    const form = useForm({
        resolver: zodResolver(publishDetailsSchema),
        defaultValues: {
            title: formData?.title || "",
            highlight: formData?.highlight || "",
            contactType: formData?.contactType || "",
            priceNight: formData?.priceNight || "",
            priceWeek: formData?.priceWeek || "",
            priceMonth: formData?.priceMonth || "",
        },
        mode: "onChange",
    });
    // Subscribe to form changes and update parent formData
    useEffect(() => {
        const subscription = form.watch((value) => {
            // Skip the initial mount to prevent unnecessary update
            if (isInitialMount.current) {
                isInitialMount.current = false;
                return;
            }

            setFormData((prev) => ({
                ...prev,
                ...value,
            }));
        });
        return () => subscription.unsubscribe();
    }, [form, setFormData]);

    // Check if form is valid and set step done
    useEffect(() => {
        if (form.formState.isValid) {
            setStepDone(7);
        }
    }, [form.formState.isValid, setStepDone]);

    const descriptionLength = form.watch("highlight")?.length || 0;

    const handleContactType = (type) => {
        form.setValue("contactType", type, { shouldValidate: true });
    };

    const contactType = form.watch("contactType");

    return (
        <div className="publish-step">
            <h2>الخطوة الاخيرة لاكتمال النشر !</h2>
            <p>يمكنك استعمال الذكاء الاصطناعي Ai.</p>

            <Form {...form}>
                <div className="publish-main">
                    {/* الوصف */}
                    <div className="highlight-area">
                        <label>
                            العنوان <span className="required">*</span>
                        </label>
                        <div className="publish-top">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="publish-title-field">
                                        <FormControl>
                                            <Input
                                                placeholder="أدخل العنوان هنا ..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="contact-types">
                                <button
                                    type="button"
                                    className={
                                        "contact-tab right gradient " +
                                        (contactType === "ai" ? "active" : "")
                                    }
                                    onClick={() => handleContactType("ai")}
                                >
                                    <i className="fa-solid fa-wand-magic-sparkles" />
                                    <span>إستخدم Ai</span>
                                </button>
                            </div>
                        </div>
                        <label>
                            وش المميز في وحدتك او سكنك <span className="required">*</span>
                        </label>
                        <p className="highlight-help">
                            أخبرنا ما الذي يميز سكنك عن غيره ..
                        </p>
                        <FormField
                            control={form.control}
                            name="highlight"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="highlight-box">
                                        <FormControl>
                                            <Textarea
                                                placeholder="اكتب هنا ..."
                                                {...field}
                                                maxLength={500}
                                                className="border-none outline-none resize-none flex-1 text-sm"
                                            />
                                        </FormControl>
                                        <div className="highlight-counter">
                                            {descriptionLength} / 500
                                        </div>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* الأسعار */}
                    <div className="pricing-area">
                        <div className="publish-top">
                            <div className="contact-types">
                                <span className="contact-label">نوع الحجز *</span>
                                <div className="contact-tabs">
                                    <button
                                        type="button"
                                        className={
                                            "contact-tab left " +
                                            (contactType === "whatsapp" ? "active" : "")
                                        }
                                        onClick={() => handleContactType("whatsapp")}
                                    >
                                        <i className="fa-brands fa-whatsapp" />
                                        <span>التواصل عبر الواتساب</span>
                                    </button>
                                    <button
                                        type="button"
                                        className={
                                            "contact-tab middle " +
                                            (contactType === "sea" ? "active primary" : "primary")
                                        }
                                        onClick={() => handleContactType("sea")}
                                    >
                                        <span>التواصل من خلال سي - sea</span>
                                        <i className="fa-solid fa-arrow-left-long" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="pricing-header-cont">
                            <div className="pricing-header">
                                <h3>
                                    حدد سعرا أساسيا خلال ايام, الاسبوع, الشهر
                                    <span className="required"> *</span>
                                </h3>
                                <p>
                                    ملاحظة: السعر الذي سيدفعه الضيف قبل الضرائب؛ مثلاً 2,375 ر.س
                                </p>
                            </div>
                            <div className="pricing-row">
                                <FormField
                                    control={form.control}
                                    name="priceNight"
                                    render={({ field }) => (
                                        <FormItem className="pricing-field relative">
                                            <FormLabel>
                                                السعر للليلة <span className="required">*</span>
                                            </FormLabel>
                                            <FormControl>

                                                <div className="relative">

                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        placeholder="مثال : من 500 ريال حتى 600 ريال"
                                                        className="pl-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                        {...field}
                                                    />
                                                    <img
                                                        src={rial}
                                                        alt="ريال"
                                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="priceWeek"
                                    render={({ field }) => (
                                        <FormItem className="pricing-field relative">
                                            <FormLabel>
                                                السعر للأسبوع <span className="required">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        placeholder="مثال : من 1000 ريال حتى 2000 ريال"
                                                        className="pl-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                        {...field}
                                                    />
                                                    <img
                                                        src={rial}
                                                        alt="ريال"
                                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="priceMonth"
                                    render={({ field }) => (
                                        <FormItem className="pricing-field relative">
                                            <FormLabel>
                                                السعر للشهر <span className="required">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        placeholder="مثال : من 5000 ريال حتى 6000 ريال"
                                                        className="pl-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                        {...field}
                                                    />
                                                    <img
                                                        src={rial}
                                                        alt="ريال"
                                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <button type="button" className="ai-pricing-btn">
                                <i className="fa-solid fa-wand-magic-sparkles" />
                                <span>إستخدم عرض المساكن المشابهة عبر Ai</span>
                            </button>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default PublishDetails;
