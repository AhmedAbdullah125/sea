import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { IoClose } from "react-icons/io5";
import { MdArrowBackIosNew } from "react-icons/md";

import { GoArrowUpLeft } from "react-icons/go";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
const NewsletterCard = ({ bgColor, item }) => {
  console.log(item)
  return (
    <div className='space-y-4 rounded-[65px] px-3 py-10 flex  flex-col justify-between' style={{ backgroundColor: `${bgColor}` }}>
      <Dialog >
        <DialogTrigger className="block ms-auto">
          <GoArrowUpLeft size={20} />
        </DialogTrigger>
        <DialogContent className="xl:min-w-[50%] min-w-[90%] bg-white rounded-[40px] xl:px-8">
          <DialogHeader>
            <DialogDescription className="flex items-center justify-between">
              <div className="flex items-center gap-4 ">
                <DialogClose asChild>
                  <Button type="button" className="size-12 bg-body hover:bg-main-blue transation-all duration-300  flex items-center justify-center rounded-full ">
                    <IoClose className="size-24" />
                  </Button>
                </DialogClose>
                <div className="size-[100px] rounded-[30px] flex flex-col items-end px-1 py-4" style={{ backgroundColor: `${bgColor}` }}>
                  <LazyLoadImage src={item?.image} className="w-full h-full object-cover rounded-[15px]" />
                  <h3 className=' font-bold  text-[8px] text-right'>
                    {item?.title}
                  </h3>
                </div>
                <div className="text-right">
                  <h4 className="text-xl font-bold">اذا حابب نرسلك كل ويكند </h4>
                  <p className="text-xs text-main-blue">المقال الأكثر قراءةً خلال الأسبوع</p>
                </div>
              </div>
              <Link to={`/newsletter/${item?.slug}`} className=" h-12 px-8   bg-main-purple  text-xs font-bold  text-white hover:bg-main-blue hover:text-white transation-all duration-300  flex items-center justify-center gap-2 rounded-full ">
                تـــابعنا الان
                <MdArrowBackIosNew size={20} />
              </Link>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <LazyLoadImage src={item?.image} className="w-full h-full object-cover rounded-[15px]" />
      <h3 className='xl:text-2xl font-bold'>
        {item?.title}
      </h3>
    </div>
  )
}

export default NewsletterCard
