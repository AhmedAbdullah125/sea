import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { ChevronLeft } from "lucide-react";
import { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SendOtp from "./SendOtp";
import VerfiyOtp from "./VerfiyOtp";
import { userContext } from "../../context/UserContext";

const LoginDialog = ({mainHeader=false}) => {
  const [phone, setPhone] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { token, logout } = useContext(userContext);
  const handleSendOtp = (enteredPhone) => {
    setPhone(enteredPhone);
    setIsOtpSent(true);
  };
  if (token) return (
    <button onClick={logout} className={`w-fit text-sm font-bold text-white ${!mainHeader ? "h-12 px-4  bg-main-blue hover:bg-main-purple transation-all duration-300  flex items-center justify-center gap-4 rounded-full " : "hover:text-main-blue"}`}>
      <p>تسجيل الخروج</p>
    </button>
  )
  return (
    <Dialog   >
      <DialogTrigger className={`w-fit text-sm font-bold text-white ${!mainHeader ?"h-12 px-4  bg-main-blue hover:bg-main-purple transation-all duration-300  flex items-center justify-center gap-4 rounded-full ":"hover:text-main-blue"}`}>
        <p>
          أنشئ حســـاب الان</p>
        {mainHeader ?null: <ChevronLeft size={18} />}
      </DialogTrigger>
      <DialogContent className='bg-white !rounded-xl  max-w-[75%] xl:p-10 ' hideClose >
        <div className="grid grid-cols-12 items-center gap-6">
          <div className="xl:col-span-5  col-span-12 xl:space-y-12 space-y-6">
            <DialogClose asChild>
              <button onClick={() => setIsOtpSent(false)} type="button" className=" size-8  bg-black  text-xs font-bold  text-white hover:bg-main-blue transation-all duration-300  flex items-center justify-center rounded-xl ">
                <IoClose size={18} />
              </button>
            </DialogClose>
            {/* form */}
            {isOtpSent ?
              <VerfiyOtp phone={phone}/> :
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
