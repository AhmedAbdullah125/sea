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
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form';
import PhoneInput from 'react-phone-number-input'
import { Input } from '@/components/ui/input';
import axios from 'axios';
import Loading from '../components/loading/Loading';
export default function EditPage() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
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

    const FormSchema = z.object({
        firstName: z.string().min(2, { message: 'name must be at least 2 characters.', }),
        lastName: z.string().min(2, { message: 'name must be at least 2 characters.', }),
        email: z.string().email({ message: 'Invalid email address.' }),
        mobile: z.string().min(8, { message: 'Phone number must be 8 characters.', }).regex(/^\+?\d+$/, { message: 'Phone number must start with a plus sign and contain only digits.', }),
    });
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fullName: data?.name || '',
            lastName: data?.lastName || '',
            email: data?.email || '',
            mobile: data?.mobile || '',
        },
    });
    function onSubmit(data) {
        // handleUpdateProfile(data);
        console.log(data);
        
    }
    const handleUpdateProfile = async (data) => {
        await updateProfile(data, setLoading);
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

    return (
        <div className="account-content">
            {
                loading || !data ? <Loading /> :
                    <div className="profile-form-ccont">
                        <h3>معلومات الملف الشخصي</h3>
                        <p>لايمكنك تعديل معلومات الملف الشخصي باستثناء البريد الالكتروني.</p>
                        <div className="form-image">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data" className="form-group">
                                    {/* first Name */}
                                    <FormField control={form.control} name="firstName" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block" dir="rtl" >
                                                <p className="text-main-blue font-bold text-sm">
                                                    الاســم الأول
                                                    <span className="text-red-500">*</span>
                                                </p>
                                            </FormLabel>
                                            <FormControl>
                                                <Input className="" placeholder="ادخل اسمك" {...field} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                    {/* second Name */}
                                    <FormField control={form.control} name="lastName" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block" dir="rtl" >
                                                <p className="text-main-blue font-bold text-sm">
                                                    الاســم الأخير
                                                    <span className="text-red-500">*</span>
                                                </p>
                                            </FormLabel>
                                            <FormControl>
                                                <Input className="" placeholder="ادخل اسمك" {...field} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                    {/* E-mail */}
                                    <FormField control={form.control} name="email" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block" dir="rtl" >
                                                <p className="text-main-blue font-bold text-sm">
                                                    البريـــد الإلكتـــرونـــي
                                                    <span className="text-red-500">*</span>
                                                </p>
                                            </FormLabel>
                                            <FormControl>
                                                <Input className="" type="email" placeholder="ادخل البريد الالكتروني" {...field} {...field} />
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
                    </div>
            }
        </div>
    );
}