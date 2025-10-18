import { motion } from 'framer-motion';
import React from 'react'
import { Link } from 'react-router-dom'
import fallbackImage from '../../../public/blogs/blogs.png'
const BlogCard = ({ blog, lang }) => {
  const formatDateArabic = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    return date.toLocaleDateString('ar-EG-u-nu-latn', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  console.log(blog)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <Link to={`/blogs/${blog?.slug}`} className='bg-body rounded-[40px] py-6 px-4 flex flex-col xl:flex-row items-center gap-4'>
        <div className='xl:w-[350px]  bg-white h-[190px] rounded-[60px] overflow-hidden min-w-40'>
          <img src={blog?.image} alt="blog" className='w-full h-full object-cover ' />
        </div>
        <div className='space-y-4 shrink-1'>
          <div className='space-y-2 max-xl:text-center'>
            <h3 className='font-bold line-clamp-2'>{blog?.title}</h3>
            <div className='text-xs text-main-blue font-medium line-clamp-2' dangerouslySetInnerHTML={{ __html: blog?.description }}></div>
          </div>
          <div className='font-semibold text-sm  flex items-center gap-2'>
            <div className='flex items-center gap-2'>
              <img src={blog?.authorImage || fallbackImage} alt="author" className='size-6 rounded-full object-cover' />
              <p className='text-main-purple font-bold'>{blog?.authorName || lang == 'ar' ? 'موقع sea' : 'sea'}</p>
            </div>
            {
              blog?.createdAt ? <>
                <div className='size-1 bg-[#D9D9D9] rounded-full'></div>
                <span >{lang == 'ar' ? '>فــي نشــرة أهــا!' : 'In the newsletter!'}  </span>
                <div className='size-1 bg-[#D9D9D9] rounded-full'></div>
                <span>{lang == 'ar' ? formatDateArabic(blog?.createdAt) : new Date(blog?.createdAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })} </span>
              </>
                : null
            }
          </div>
        </div>

      </Link>
    </motion.div>
  )
}

export default BlogCard
