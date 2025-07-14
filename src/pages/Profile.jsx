'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import 'react-phone-number-input/style.css';
import { API_BASE_URL } from '@/lib/apiConfig';
import { toast } from 'sonner';
import { updateProfile } from './updateProfileData';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormControl, FormMessage , FormLabel } from '@/components/ui/form';
import PhoneInput from 'react-phone-number-input'
import { Input } from '@/components/ui/input';
import axios from 'axios';
import Loading from '../components/loading/Loading';
export default function EditPage() {
    const [data, setData] = useState({});
    const lang = localStorage.getItem('lang') || 'en';
    const [loading, setLoading] = useState(false);
    const [countryNumberLength, setCountryNumberLength] = useState(0)
    const [country, setCountry] = useState(String(data?.country?.id));
    const [token, setToken] = useState(null);
    const [countryIso, setCountryIso] = useState(String(data?.country?.iso));
    const [countryData, setCountryData] = useState(null);
    useEffect(() => {
        setLoading(true);
        //scroll to the top of page 
        window.scrollTo(0, 0);
        const getData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/user/profile`, {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                });
                setData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error retrieving data:', error);
                setLoading(false);
                throw new Error('Could not get data');
            }
        };
        getData();
    }, []);
    console.log(data);
    console.log(countryData);

    useEffect(() => {
        const savedToken = sessionStorage.getItem('token');
        setToken(savedToken);
        if (!savedToken) { toast('You are not logged in', { style: { borderColor: "#dc3545", boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)', }, }); }
    }, []);
    const FormSchema = z.object({
        fullName: z.string().min(2, { message: 'name must be at least 2 characters.', }),
        phone: z.string().min(8, { message: 'Phone number must be 8 characters.', }).regex(/^\+?\d+$/, { message: 'Phone number must start with a plus sign and contain only digits.', }),
    });
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: { fullName: data?.name || '', phone: data?.phone || '' },
    });
    function onSubmit(data) {
        handleUpdateProfile(data);
    }
    const handleUpdateProfile = async (data) => {
        await updateProfile(data, countryIso, setLoading, lang);
    };
    useEffect(() => {
        setLoading(true)
        const getCountries = async () => {
            try {
                const response = await axios.get(API_BASE_URL + `/countries`, {});
                let data = response.data.data;
                setCountryData(data)
                setLoading(false)
            } catch (error) {
                console.error('Error retrieving data:', error);
                throw new Error('Could not get data');
                setLoading(false)
            }
        };
        getCountries();
    }, []);
    useEffect(() => {
        if (countryData && country) {
            const selectedCountry = countryData.find(item => item.id == country);
            if (selectedCountry) {
                setCountryNumberLength(selectedCountry?.phone_length);
                setCountryIso(selectedCountry?.iso);
            }
        }
    }, [country, countryData]);
    return (
        <div className="account-content">
            {
                loading || !data ? <Loading /> :
                    <div className="profile-form">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data" className="form-group">
                                {/* Full Name */}
                                <FormField control={form.control} name="fullName" render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input className="form-input mb-3" placeholder={lang == "en" ? "Enter your name" : "ادخل اسمك"} {...field} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                                {/* Date and Phone */}
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="mobile"
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
                                <div className="form-btn-cont">
                                    <Button className="form-btn" type="submit">حفظ</Button>
                                </div>
                            </form>
                        </Form>
                    </div>
            }
        </div>
    );
}