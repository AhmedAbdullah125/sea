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
import { Link } from "react-router-dom";
import profileImage from '../../../public/app/profile.svg'
import loginImg from '../../../public/app/login.png'
import { useGetProfile } from "../global/useGetProfile";

const LoginDialog = ({ mainHeader = false }) => {
  const [phone, setPhone] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { token, logout } = useContext(userContext);
  const { data: profile, isLoading } = useGetProfile();


  const handleSendOtp = (enteredPhone) => {
    setPhone(enteredPhone);
    setIsOtpSent(true);
  };

  if (token) return (

    <Link to="/account/profile" className='profile'>
      <LazyLoadImage src={isLoading ? profileImage : profile?.image || profileImage} alt="logo" loading='lazy' className='profile-img-login' />
    </Link>

  )
  return (
    <Dialog   >
      <DialogTrigger className={`w-fit text-sm font-bold text-white ${!mainHeader ? "h-12 px-4  bg-main-blue hover:bg-main-purple transation-all duration-300  flex items-center justify-center gap-4 rounded-full " : "hover:text-main-blue"}`}>
        <p>تسجـــيل الدخــول</p>
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
            <img src={loginImg} alt="logo" loading='lazy' className="h-full w-full " />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LoginDialog
