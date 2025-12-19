import { useEffect, useState, useMemo } from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import { Link, useNavigate } from 'react-router-dom'
import footerLogo from '../../public/app/footerLogo.svg'
import Loading from '../components/loading/Loading'
import { toast } from 'sonner'
import iphnoe from '../../public/app/iphnoe.png'
import profileIcon from '../../public/app/profile.svg'
import housingTypeIcon from '../../public/app/Vector1.svg'
import locationIcon from '../../public/app/location.svg'
import emailIcon from '../../public/app/email.svg'
import phoneIcon from '../../public/app/phone.svg'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useGetCountries } from '@/components/global/useGetCountries'
import { useGetFilters } from '@/components/global/useGetFilters'

// Zod validation schema
const packageFormSchema = z.object({
    firstName: z.string().min(2, {
        message: 'يجب أن يحتوي الاسم الأول على حرفين على الأقل',
    }),
    lastName: z.string().min(2, {
        message: 'يجب أن يحتوي اللقب والاسم الأخير على حرفين على الأقل',
    }),
    email: z.string().email({
        message: 'يرجى إدخال بريد إلكتروني صحيح',
    }),
    phone: z.string().regex(/^5[0-9]{8}$|^05[0-9]{8}$/, {
        message: 'يرجى إدخال رقم جوال صحيح',
    }),
    housingType: z.string().min(1, {
        message: 'يرجى اختيار نوع السكن',
    }),
    country: z.string().min(1, {
        message: 'يرجى اختيار البلد',
    }),
    city: z.string().min(1, {
        message: 'يرجى اختيار المدينة',
    }),
    terms: z.boolean().refine((val) => val === true, {
        message: 'يجب الموافقة على الشروط والأحكام',
    }),
})

const AddPackage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [selectedCountryCities, setSelectedCountryCities] = useState([])
    const token = localStorage.getItem("token");

    // Fetch data from hooks
    const { data: countriesData } = useGetCountries()
    const { data: filtersData } = useGetFilters()

    // Map housing types from filters
    const housingTypes = useMemo(() =>
        filtersData?.flats?.map((item) => ({ label: item?.name || item, value: String(item?.id || item) })) || [],
        [filtersData]
    )

    const form = useForm({
        resolver: zodResolver(packageFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            housingType: '',
            country: '',
            city: '',
            terms: false,
        },
    })

    // Watch country to filter cities from nested cities array
    const selectedCountry = form.watch('country')

    // Update cities when country changes
    useEffect(() => {
        const selectedCountryCitiesData = countriesData?.find((country) => country.id === Number(selectedCountry))?.cities
        setSelectedCountryCities(selectedCountryCitiesData || [])
        // Clear city selection when country changes
        if (selectedCountry) {
            form.setValue('city', '')
        }
    }, [selectedCountry, countriesData])

    useEffect(() => {
        if (!token) {
            navigate("/login");
            toast.error('يجب تسجيل الدخول أولاً');
        }
    }, []);

    const onSubmit = (data) => {
        setLoading(true)
        console.log('Form data:', data)
        // Add your API call here
        toast.success('تم إرسال البيانات بنجاح')
        setLoading(false)
    }
    const t = { "flat": "شقق فندقية", "room": "غرفة", "hotel": "⁠فنادق بتوصية ســـي", "villa": "فلل وشاليهات ", "huts": "أكواخ خشبية", "hotel_suites": "أجنحة فندقية" }

    return (
        <section>
            <Header />
            <div className="add-main-cont">
                <div className="container">
                    {
                        loading ? <Loading />
                            :
                            <div className="add-cont">
                                <div className="navigate">
                                    <div className="r-side">
                                        <button className='navigate-btn' onClick={() => navigate(-1)}>
                                            <i className='fa-solid fa-arrow-right'></i>
                                        </button>
                                        <span>أضف باقتك</span>
                                    </div>
                                    <Link to="/"><img src={footerLogo} alt="logo" /></Link>
                                </div>
                                <div className="add-package-cont">
                                    <div className="img-cont">
                                        <img src={iphnoe} alt="iphnoe" className='main-img' />
                                        <img src={iphnoe} alt="iphnoe" className='sub-img' />
                                    </div>
                                    <div className="form-cont">
                                        <h2 className="form-title">استثمر تجاربك بإضافة باقتك في <span>+Sea!</span></h2>

                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)} className="package-form">
                                                <div className="form-row">
                                                    <FormField
                                                        control={form.control}
                                                        name="firstName"
                                                        className="form-field"
                                                        render={({ field }) => (
                                                            <FormItem className="form-field">
                                                                <FormLabel>الاسم الأول *</FormLabel>
                                                                <FormControl>
                                                                    <div className="input-with-icon">
                                                                        <img src={profileIcon} alt="profile" className="input-icon" />
                                                                        <Input placeholder="أدخل الاسم الأكبر هنا ..." {...field} />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="lastName"
                                                        className="form-field"
                                                        render={({ field }) => (
                                                            <FormItem className="form-field">
                                                                <FormLabel>اللقب والاسم الأخير *</FormLabel>
                                                                <FormControl>
                                                                    <div className="input-with-icon">
                                                                        <img src={profileIcon} alt="profile" className="input-icon" />
                                                                        <Input placeholder="أدخل الاسم الأكبر هنا ..." {...field} />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <div className="form-row">
                                                    <FormField
                                                        control={form.control}
                                                        name="email"
                                                        className="form-field"
                                                        render={({ field }) => (
                                                            <FormItem className="form-field">
                                                                <FormLabel>البريد الإلكتروني *</FormLabel>
                                                                <FormControl>
                                                                    <div className="input-with-icon">
                                                                        <img src={emailIcon} alt="email" className="input-icon" />
                                                                        <Input type="email" placeholder="أدخل بريدك الإلكتروني هنا ..." {...field} />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="phone"
                                                        className="form-field"
                                                        render={({ field }) => (
                                                            <FormItem className="form-field">
                                                                <FormLabel>رقم الجوال *</FormLabel>
                                                                <FormControl>
                                                                    <div className="input-with-icon">
                                                                        <img src={phoneIcon} alt="phone" className="input-icon" />
                                                                        <Input placeholder="5x xxx xx xx" {...field} />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <div className="form-row">
                                                    <FormField
                                                        control={form.control}
                                                        name="housingType"
                                                        className="form-field"
                                                        render={({ field }) => (
                                                            <FormItem className="form-field">
                                                                <FormLabel>نوع السكن *</FormLabel>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl>
                                                                        <div className="select-with-icon">
                                                                            <img src={housingTypeIcon} alt="housing" className="input-icon" />
                                                                            <SelectTrigger
                                                                                icon={<span className="select-icon"><i className="fa-solid fa-chevron-down"></i></span>}
                                                                            >
                                                                                <SelectValue placeholder="اختر نوع السكن هنا ..." />
                                                                            </SelectTrigger>
                                                                        </div>
                                                                    </FormControl>
                                                                    <SelectContent className="select-content">
                                                                        {housingTypes?.map((option) => (
                                                                            <SelectItem key={option.value} value={option.value} className="item">
                                                                                {t[option.value]}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="country"
                                                        className="form-field"
                                                        render={({ field }) => (
                                                            <FormItem className="form-field">
                                                                <FormLabel>البلد *</FormLabel>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl>
                                                                        <div className="select-with-icon">
                                                                            <img src={locationIcon} alt="location" className="input-icon" />
                                                                            <SelectTrigger
                                                                                icon={<span className="select-icon"><i className="fa-solid fa-chevron-down"></i></span>}
                                                                            >
                                                                                <SelectValue placeholder="اختر البلد هنا ..." />
                                                                            </SelectTrigger>
                                                                        </div>
                                                                    </FormControl>
                                                                    <SelectContent className="select-content">
                                                                        {countriesData?.map((option) => (
                                                                            <SelectItem key={option.id} value={String(option.id)} className="item">
                                                                                {option.name}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="city"
                                                        className="form-field"
                                                        render={({ field }) => (
                                                            <FormItem className="form-field">
                                                                <FormLabel>المدينة *</FormLabel>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedCountry}>
                                                                    <FormControl>
                                                                        <div className="select-with-icon">
                                                                            <img src={locationIcon} alt="location" className="input-icon" />
                                                                            <SelectTrigger
                                                                                icon={<span className="select-icon"><i className="fa-solid fa-chevron-down"></i></span>}
                                                                            >
                                                                                <SelectValue placeholder="اختر المدينة هنا ..." />
                                                                            </SelectTrigger>
                                                                        </div>
                                                                    </FormControl>
                                                                    <SelectContent className="select-content">
                                                                        {selectedCountryCities?.map((option) => (
                                                                            <SelectItem key={option.id} value={String(option.id)} className="item">
                                                                                {option.name}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <FormField
                                                    control={form.control}
                                                    name="terms"
                                                    className="form-field"
                                                    render={({ field }) => (
                                                        <FormItem className="terms-field">
                                                            <div className="terms-checkbox">
                                                                <FormControl>
                                                                    <div
                                                                        role="checkbox"
                                                                        aria-checked={field.value}
                                                                        data-state={field.value ? "checked" : "unchecked"}
                                                                        onClick={() => field.onChange(!field.value)}
                                                                        className="custom-checkbox"
                                                                    >
                                                                        {field.value && <i className="fa-solid fa-check"></i>}
                                                                    </div>
                                                                </FormControl>
                                                                <FormLabel
                                                                    className="terms-label"
                                                                    onClick={() => field.onChange(!field.value)}
                                                                >
                                                                    لقد قرأت وأوافق على شروط الإعلان و الشروط والأحكام و سياسة الخصوصية.
                                                                </FormLabel>
                                                            </div>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <button type="submit" className="submit-btn">
                                                    <span>أضف باقتك الآن</span>
                                                    <i className="fa-solid fa-arrow-left"></i>
                                                </button>
                                            </form>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>

            <Footer />
        </section>
    );
};

export default AddPackage;
