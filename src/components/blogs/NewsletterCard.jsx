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
import { motion } from "framer-motion";
const NewsletterCard = ({ bgColor, item }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className='space-y-4 h-[220px] rounded-[65px]  bg-cover bg-center bg-no-repeat overflow-hidden' style={{ backgroundColor: `${bgColor}`, backgroundImage: `url(${item?.image})` }}>
     
      <div className="flex  flex-col justify-between  p-10 w-full h-full bg-black/50 text-white">
        
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
                <div className="size-[100px] rounded-[30px] flex items-end p-4 bg-center bg-cover bg-no-repeat" style={{ backgroundColor: `${bgColor}` , backgroundImage: `url(${item?.image})`}}>
                  {/* <h3 className=' font-bold  text-[8px] text-right'>
                    {item?.title}
                  </h3> */}
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
      {/* <LazyLoadImage src={item?.image} className="w-full h-full object-cover rounded-[15px]" /> */}
      <h3 className='xl:text-2xl font-bold'>
        {item?.title}
      </h3>
     </div>
    </motion.div>
  )
}

export default NewsletterCard
