import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Search, MapPin, LocateFixed } from "lucide-react"

const addressSchema = z.object({
    label: z.string().min(1, { message: "هذا الحقل مطلوب" }),
    city: z.string().min(1, { message: "هذا الحقل مطلوب" }),
    street: z.string().min(1, { message: "هذا الحقل مطلوب" }),
    postalCode: z.string().min(1, { message: "هذا الحقل مطلوب" }),
    region: z.string().min(1, { message: "هذا الحقل مطلوب" }),
    showOnMap: z.boolean().optional(),
    latitude: z.string().optional().nullable(),
    longitude: z.string().optional().nullable(),
})

const Address = ({ formData, setFormData }) => {
    const [isLocating, setIsLocating] = useState(false)

    const defaultValues = useMemo(
        () => ({
            label: "",
            city: "",
            street: "",
            postalCode: "",
            region: "",
            showOnMap: false,
            latitude: "",
            longitude: "",
            ...(formData?.address ?? {}),
        }),
        [formData?.address]
    )

    const form = useForm({
        resolver: zodResolver(addressSchema),
        defaultValues,
        mode: "onTouched",
    })

    useEffect(() => {
        form.reset(defaultValues)
    }, [defaultValues, form])

    useEffect(() => {
        const subscription = form.watch((values) => {
            setFormData((prev) => ({
                ...prev,
                address: {
                    ...(prev?.address ?? {}),
                    ...values,
                },
            }))
        })

        return () => subscription.unsubscribe()
    }, [form, formData])

    const watchedValues = form.watch()

    const mapQuery = useMemo(() => {
        if (watchedValues.latitude && watchedValues.longitude) {
            return `${watchedValues.latitude},${watchedValues.longitude}`
        }

        const composed = [
            watchedValues.label,
            watchedValues.street,
            watchedValues.city,
            watchedValues.region,
        ]
            .filter(Boolean)
            .join(" ")

        return composed || "Riyadh, Saudi Arabia"
    }, [watchedValues])

    const handleUseCurrentLocation = () => {
        if (!navigator.geolocation) {
            return
        }
        setIsLocating(true)
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                form.setValue("latitude", coords.latitude.toString(), { shouldDirty: true, shouldTouch: true })
                form.setValue("longitude", coords.longitude.toString(), { shouldDirty: true, shouldTouch: true })
                form.setValue("showOnMap", true, { shouldDirty: true, shouldTouch: true })
                setIsLocating(false)
            },
            () => {
                setIsLocating(false)
            },
            { enableHighAccuracy: true }
        )
    }

    const searchValue = watchedValues.latitude && watchedValues.longitude
        ? `إحداثيات: ${Number(watchedValues.latitude).toFixed(5)}, ${Number(watchedValues.longitude).toFixed(5)}`
        : mapQuery

    return (
        <Form {...form}>
            <div className="house-type address-step">
                <h2>أين يقــع سكــنك !.</h2>
                <p>هل الديسوس بالمكان الصحيح لضيوفك؟</p>
                <div className="address-layout">
                    <div className="map-card">
                        <h3>العنوان :</h3>
                        <div className="map-search">
                            <Search size={18} />
                            <Input
                                defaultValues={searchValue}
                                // readOnly
                                className="address-input"
                                placeholder="ابحث بإدخال العنوان هنا..."
                            />
                        </div>
                        <div className="map-wrapper">
                            <iframe
                                title="house-location-map"
                                src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&hl=ar&z=15&output=embed`}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                            <div className="map-controls">
                                <button type="button" className="map-round-btn" aria-label="تكبير">+</button>
                                <button type="button" className="map-round-btn" aria-label="تصغير">-</button>
                                <button type="button" className="map-round-btn" aria-label="إعادة التمركز">
                                    <MapPin size={14} />
                                </button>
                            </div>
                        </div>
                        <Button
                            type="button"
                            className="location-btn"
                            onClick={handleUseCurrentLocation}
                            disabled={isLocating}
                        >
                            <LocateFixed size={18} />
                            {isLocating ? "يتم تحديد موقعك..." : "استخدم الموقع الحالي"}
                        </Button>
                    </div>

                    <div className="confirmation-card">
                        <h3>تأكيد عنوانك :</h3>
                        <div className="address-form" dir="rtl">
                            <FormField
                                control={form.control}
                                name="label"
                                render={({ field }) => (
                                    <FormItem className="address-field">
                                        <FormLabel>
                                            الاسم <span>*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="ادخل الاسم هنا..."
                                                className="address-input"
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
                                    <FormItem className="address-field">
                                        <FormLabel>
                                            المدينة <span>*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="ادخل المدينة هنا..."
                                                className="address-input"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="street"
                                render={({ field }) => (
                                    <FormItem className="address-field">
                                        <FormLabel>
                                            عنوان الشارع <span>*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="ادخل عنوان الشارع هنا..."
                                                className="address-input"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="postalCode"
                                render={({ field }) => (
                                    <FormItem className="address-field">
                                        <FormLabel>
                                            الرمز البريدي <span>*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="ادخل الرمز البريدي هنا..."
                                                className="address-input"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="region"
                                render={({ field }) => (
                                    <FormItem className="address-field">
                                        <FormLabel>
                                            المنطقة <span>*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="ادخل المنطقة هنا..."
                                                className="address-input"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="details-toggle">
                        <div className="toggle-title">
                            <span>التفاصيل :</span>
                        </div>
                        <FormField
                            control={form.control}
                            name="showOnMap"
                            render={({ field }) => (
                                <FormItem className="toggle-row">
                                    <span>هل ترغب بإظهار موقعك على الخريطة !</span>
                                    <FormControl>
                                        <div style={{ direction: "ltr" }}>
                                            <Switch
                                                checked={field.value ?? false}
                                                onCheckedChange={(value) => field.onChange(value)}
                                                className="data-[state=checked]:bg-[#03a26d] data-[state=unchecked]:bg-[#BFC3C7] ps-[2px]"
                                            />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </div>
        </Form>
    )
}

export default Address