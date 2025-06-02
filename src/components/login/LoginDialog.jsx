import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SendOtp from "./SendOtp";
import VerfiyOtp from "./VerfiyOtp";

const LoginDialog = () => {
  const [phone, setPhone] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = (enteredPhone) => {
    setPhone(enteredPhone);
    setIsOtpSent(true);
  };
  return (
    <Dialog   >
      <DialogTrigger className="h-12 px-4 w-fit bg-main-blue border-2 border-main-blue text-xs font-bold  text-white hover:bg-white hover:text-main-blue  flex items-center justify-center gap-4 rounded-full ">
        <p>أنشئ حســـاب الان</p>
        <ChevronLeft size={18} />
      </DialogTrigger>
      <DialogContent className='bg-white !rounded-xl  max-w-[75%] xl:p-10 ' hideClose >
        <div className="grid grid-cols-12 items-center gap-6">
          <div className="xl:col-span-5  col-span-12 xl:space-y-12 space-y-6">
            <DialogClose asChild>
              <button onClick={() => setIsOtpSent(false)} type="button" className=" size-8  bg-black border-2 border-black text-xs font-bold  text-white hover:bg-white hover:text-black  flex items-center justify-center rounded-xl ">
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
