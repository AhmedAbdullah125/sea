import React, { useEffect } from "react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft } from "lucide-react";
import { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SendOtp from "./SendOtp";
// import LoginDialog from '../login/LoginDialog'
import VerfiyOtp from "./VerfiyOtp";
import { userContext } from "../../context/UserContext";
import axios from 'axios'
import { API_BASE_URL } from '../../lib/apiConfig'
import { Link } from "react-router-dom";
import profileImage from '../../../public/home/profile.svg'

const LoginDialog = ({ mainHeader = false }) => {
  const [phone, setPhone] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { token, logout } = useContext(userContext);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  useEffect(() => {
    setLoading(true);
    //scroll to the top of page 
    window.scrollTo(0, 0);
    const getData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/profile`, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
        const user = response.data.data;
        localStorage.setItem('userCountry', user.countryName);
        setProfile(user);
        setLoading(false);
      } catch (error) {
        console.error('Error retrieving data:', error);
        setLoading(false);
        throw new Error('Could not get data');
      }
    };
    getData();

  }, []);
  const handleSendOtp = (enteredPhone) => {
    setPhone(enteredPhone);
    setIsOtpSent(true);
  };

  if (token) return (

    <>
      {
        loading ?
         
          <Link to="/account/profile" className='profile'>
            <LazyLoadImage src={profile?.image || profileImage} alt="logo" loading='lazy' className='w-[45px] h-[45px] rounded-full m-auto object-cover header-profileImage border-2 border-white bg-white' />
          </Link>
          :
          <Link to="/account/profile" className='profile'>
            <LazyLoadImage src={profile?.image || profileImage} alt="logo" loading='lazy' className='w-[45px] h-[45px] rounded-full m-auto object-cover header-profileImage border-2 border-white bg-white' />
          </Link>
      }

    </>
  )
  return (
    <Dialog   >
      <DialogTrigger className={`w-fit text-sm font-bold text-white ${!mainHeader ? "h-12 px-4  bg-main-blue hover:bg-main-purple transation-all duration-300  flex items-center justify-center gap-4 rounded-full " : "hover:text-main-blue"}`}>
        <p>
          أنشئ حســـاب الان</p>
        {mainHeader ? null : <ChevronLeft size={18} />}
      </DialogTrigger>
      <DialogContent className='bg-white !rounded-xl  max-w-[90%] xl:p-10 z-[999999]' hideClose >
        <div className="grid grid-cols-12 items-center gap-6">
          <div className="xl:col-span-5  col-span-12 xl:space-y-12 space-y-6">
            <DialogClose asChild>
              <button onClick={() => setIsOtpSent(false)} type="button" className=" size-8  bg-black  text-xs font-bold  text-white hover:bg-main-blue transation-all duration-300  flex items-center justify-center rounded-xl ">
                <IoClose size={18} />
              </button>
            </DialogClose>
            {/* form */}
            {isOtpSent ?
              <VerfiyOtp phone={phone} /> :
              <SendOtp handleSendOtp={handleSendOtp} />
            }
          </div>
          {/* image */}
          <div className="xl:col-span-7  max-xl:hidden h-full">
            <LazyLoadImage src={'/login/login.png'} alt="logo" loading='lazy' className="h-full w-full " />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LoginDialog
