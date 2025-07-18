'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import 'react-phone-number-input/style.css';
import { API_BASE_URL } from '@/lib/apiConfig';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form';
import PhoneInput from 'react-phone-number-input'
import { Input } from '@/components/ui/input';
import axios from 'axios';
import Loading from '../components/loading/Loading';
import { updateProfile } from './updateProfileData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown } from "lucide-react"

import imgIcon from '../../public/profile/ddd.svg';
export default function EditPage() {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [countryData, setCountryData] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setImageFile(file);
        }
    };
    useEffect(() => {
        setLoading(true);
        //scroll to the top of page 
        window.scrollTo(0, 0);
        const getData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${API_BASE_URL}/user/profile`, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
                const response2 = await axios.get(API_BASE_URL + `/countries`, {});
                setProfile(response.data.data);
                let data = response2.data.data;
                setCountryData(data)
                setLoading(false);
            } catch (error) {
                console.error('Error retrieving data:', error);
                setLoading(false);
                throw new Error('Could not get data');
            }
        };
        getData();
    }, []);
    console.log(profile);

    const FormSchema = z.object({
        firstName: z.string().min(2, { message: 'name must be at least 2 characters.', }),
        lastName: z.string().min(2, { message: 'name must be at least 2 characters.', }),
        email: z.string().email({ message: 'Invalid email address.' }),
        mobile: z.string().min(8, { message: 'Phone number must be 8 characters.', }).regex(/^\+?\d+$/, { message: 'Phone number must start with a plus sign and contain only digits.', }),
        country : z.string().min(1, { message: 'country must be at least 2 characters.', }),
    });
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fullName: profile?.name || '',
            lastName: profile?.lastName || '',
            email: profile?.email || '',
            mobile: profile?.mobile || '',
            country: profile?.countryId || '',
        },
    });
    function onSubmit(data) {
        if (!selectedImage && !profile.image) {
            toast('Please select a profile image.', { style: { borderColor: "#dc3545", boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)', }, });
            document.getElementById('triger').style.border = '1px solid red';
            return
        }
        let newData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            mobile: data.mobile,
            countryId: data.country,
            image: selectedImage ? imageFile : ""
        }
        handleUpdateProfile(newData);
    }
    const handleUpdateProfile = async (data) => {
        await updateProfile(data, setLoading);
    };
    //setting default values of from 
    useEffect(() => {
        form.setValue('firstName', profile?.name || '');
        form.setValue('lastName', profile?.lastName || '');
        form.setValue('email', profile?.email || '');
        form.setValue('mobile', `${Number(profile?.mobile)}` || '');
        form.setValue('country', profile?.countryId || '');

        if (selectedImage) {
            document.getElementById('triger').style.border = 'none';
        }
    }, [profile, setSelectedImage]);

    console.log(profile);

    return (
        <div className="account-content">
            {
                loading || !profile  || !countryData? <Loading /> :
                    <div className="profile-form-ccont">
                        <h3>معلومات الملف الشخصي</h3>
                        <p>يمكنك تعديل معلومات الملف الشخصي باستثناء الرقم الجوال.</p>
                        <div className="form-image">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data" className="form-group">
                                    <div className="r-side">
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
                                                    <Input className="" placeholder="ادخل اسمك" {...field} />
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
                                                    <Input className="" placeholder="ادخل اسمك" {...field} />
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
                                                    <Input className="" type="email" placeholder="ادخل البريد الالكتروني" {...field} />
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
                                                                disabled
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-red-500  text-xs text-end" />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        {/* start */}
                                        <FormField
                                            control={form.control}
                                            name={"country"}
                                            className="w-full "
                                            render={() => (
                                                <FormItem className="w-full">
                                                    <FormLabel className="block" dir="rtl" >
                                                            <p className="text-main-blue font-bold text-sm">
                                                                الدولـــة
                                                                <span className="text-red-500">*</span>
                                                            </p>
                                                        </FormLabel>
                                                    <Select dir="rtl"
                                                        defaultValue={""}
                                                        onValueChange={(val) => setSelectedCountry(val)} >
                                                        <FormControl>
                                                            <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                                                                <ChevronDown size={14} />
                                                            </div>} className={`bg-white  text-[#797979]  text-xs font-semibold border-none  rounded-full h-12`}>
                                                                <SelectValue placeholder={"اختر الدولة"} className="text-[#797979]" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className=" shadow border-none rounded-xl bg-white  ">
                                                            {countryData.map((option) => (
                                                                <SelectItem key={option.id} value={String(option.id)} className=" cursor-pointer focus:bg-body rounded-xl">
                                                                    {option.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                        <Button className="form-btn-cont" type="submit">
                                            <sapan className="form-btn">حفظ</sapan>
                                        </Button>
                                    </div>
                                    <div className="l-side">
                                        <label htmlFor="IDImage" className='profile-img-lable' id='triger'>
                                            <div className="triger" >
                                                {
                                                    selectedImage ?
                                                        <img src={selectedImage} alt="profile" width={200} height={200} className='selected-img' /> :
                                                        //getting the first letter of the name
                                                        // <p>{data.name.charAt(0).toUpperCase()}</p>
                                                        profile?.image ?
                                                            <img src={profile?.image} alt="profile" width={200} height={200} /> :
                                                            <div className="img-icon-cont">
                                                                <div className="img-cont">
                                                                    <img src={imgIcon} alt='icon' />
                                                                </div>
                                                                <span>الصــورة الشخصــية</span>
                                                                <p>* png - jepg *</p>
                                                            </div>
                                                }
                                            </div>
                                        </label>
                                        <input id="IDImage" type="file" value="" accept="image/*" style={{ display: 'none' }} className="border mx-auto px-2  py-7 text-lg rounded-md" onChange={handleImageChange} />
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
            }
        </div>
    );
}