import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

// Zod validation schema
const finalDetailsSchema = z.object({
    country: z.string().min(1, "الدولة مطلوبة"),
    city: z.string().min(1, "المدينة مطلوبة"),
    street: z.string().min(1, "الشارع مطلوب"),
    district: z.string().min(1, "الحي مطلوب"),
    idNumber: z.string().min(1, "رقم الهوية أو الجواز مطلوب"),
    age: z.coerce.number().min(18, "العمر يجب أن يكون 18 سنة على الأقل"),
    acceptTerms: z.boolean().refine((val) => val === true, {
        message: "يجب الموافقة على الشروط والأحكام",
    }),
});

const FinalDetails = ({ formData, setFormData, setStepDone }) => {
    const isInitialMount = useRef(true);

    const form = useForm({
        resolver: zodResolver(finalDetailsSchema),
        defaultValues: {
            country: formData?.country || "",
            city: formData?.city || "",
            street: formData?.street || "",
            district: formData?.district || "",
            idNumber: formData?.idNumber || "",
            age: formData?.age || "",
            acceptTerms: formData?.acceptTerms || false,
        },
        mode: "onChange", // Validate on change
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
            setStepDone(8);
        }
    }, [form.formState.isValid, setStepDone]);

    return (
        <div className="final-details">
            <h2>نحتاج الى بعض التفاصيل الاخيرة !</h2>
            <p>بيانات بسيطة جداً.</p>

            <div className="final-details-grid">
                <Form {...form}>
                    <div className="final-form">
                        <div className="form-row">
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem className="form-field">
                                        <FormLabel>
                                            الدولة <span className="required">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="أدخل الدولة هنا ..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem className="form-field">
                                        <FormLabel>
                                            المدينة <span className="required">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="أدخل المدينة هنا ..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="form-row">
                            <FormField
                                control={form.control}
                                name="street"
                                render={({ field }) => (
                                    <FormItem className="form-field">
                                        <FormLabel>
                                            الشارع <span className="required">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="أدخل الشارع هنا ..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="district"
                                render={({ field }) => (
                                    <FormItem className="form-field">
                                        <FormLabel>
                                            الحي <span className="required">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="أدخل الحي هنا ..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="form-row">
                            <FormField
                                control={form.control}
                                name="idNumber"
                                render={({ field }) => (
                                    <FormItem className="form-field">
                                        <FormLabel>
                                            رقم الهوية أو الجواز <span className="required">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="أدخل رقم الهوية أو الجواز هنا ..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="age"
                                render={({ field }) => (
                                    <FormItem className="form-field">
                                        <FormLabel>
                                            العمر <span className="required">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="18"
                                                placeholder="أدخل العمر هنا ..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="acceptTerms"
                            render={({ field }) => (
                                <FormItem className="terms-row">
                                    <div className="flex items-start gap-2">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel className="!mt-0 cursor-pointer">
                                            بالنقر فوق "نشر الآن"، فإنك توافق على{" "}
                                            <a href="#terms">الشروط والأحكام وسياسة الخصوصية</a>
                                        </FormLabel>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </Form>

                <div className="pledge-card">
                    <h3>تعهد المستضيف</h3>
                    <p>أنا، بصفتي المستضيف، أقر وأتعهد بما يلي:</p>
                    <ul>
                        <li>
                            1- أن جميع المعلومات المذكورة عن الوحدة السكنية صحيحة ودقيقة بنسبة لا تقل عن 80%.
                        </li>
                        <li>
                            2- الالتزام بمراعاة راحة الضيف، ومعالجة أي أعطال أو مشاكل طارئة بشكل فوري ودون تأخير.
                        </li>
                        <li>
                            3- المحافظة على نظافة الوحدة وتجهيزها بما يتوافق مع المواصفات المذكورة في المنصة.
                        </li>
                        <li>
                            4- الالتزام باللوائح المحلية والأنظمة المعمول بها في ما يخص تأجير الوحدات السكنية.
                        </li>
                        <li>
                            5- التعامل مع الضيوف بأعلى معايير الاحترام والاحترافية.
                        </li>
                        <li>
                            6- في حال حدث ظرف طارئ يمنع استضافة الضيف، ألتزم بإبلاغ المنصة فوراً وإيجاد حل بديل إن أمكن.
                        </li>
                    </ul>
                    <p className="pledge-sign">
                        بتوقيعي على هذا التعهد أوافق على الشروط أعلاه وأتحمل كامل المسؤولية تجاه الضيوف والمنصة.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FinalDetails;
