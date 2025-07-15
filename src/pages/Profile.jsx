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
import imgIcon from '../../public/profile/ddd.svg';
export default function EditPage() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [countryData, setCountryData] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
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
        if (!selectedImage) {
            toast('Please select a profile image.', { style: { borderColor: "#dc3545", boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)', }, });
            document.getElementById('triger').style.border = '1px solid red';
            return
        }
        let newData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            mobile: data.mobile,
            image: selectedImage
        }
        handleUpdateProfile(newData);
    }
    const handleUpdateProfile = async (data) => {
        await updateProfile(data, setLoading);
    };
    //setting default values of from 
    useEffect(() => {
        form.setValue('firstName', data?.name || '');
        form.setValue('lastName', data?.lastName || '');
        form.setValue('email', data?.email || '');
        form.setValue('mobile', `+${data?.mobile}` || '');
        if(selectedImage){
            document.getElementById('triger').style.border = 'none';
        }
    }, [data, setSelectedImage]);
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
    console.log(data);

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
                                    </div>
                                    <div className="l-side">
                                        <label htmlFor="IDImage" className='profile-img-lable' id='triger'>
                                            <div className="triger" >
                                                {
                                                    selectedImage ?
                                                        <img src={selectedImage} alt="profile" width={200} height={200} className='selected-img' /> :
                                                        //getting the first letter of the name
                                                        // <p>{data.name.charAt(0).toUpperCase()}</p>
                                                        data?.image ?
                                                            <img src={data?.image} alt="profile" width={200} height={200} /> :
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