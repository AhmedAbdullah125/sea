import { motion } from 'framer-motion';
import AlertWarning from '../alerts/AlertWarning';
import Loader from '../loader/Loader';
import BlogCard from './BlogCard';
const BlogsSection = ({ title, data, isLoading,lang }) => {

  if (isLoading) return <Loader />

  return (
    <section className='space-y-12'>
      {title &&
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className='xl:text-3xl md:text-2xl text-xl  font-bold text-main-blue max-xl:text-center'>{title}</motion.h2>
      }
      {data?.data?.data?.length == 0 ?
        <AlertWarning >
          {lang === 'ar' ? 'لا يوجد مقالات متاحه الآن' : 'No blogs available now'}
        </AlertWarning>
        :
        <div className='grid grid-col-1 md:grid-cols-2 gap-4'>
          {
            data?.data?.data?.map((blog, index) => (
              <BlogCard key={index} blog={blog} lang={lang} />
            ))
          }
        </div>
      }
    </section>
  )
}

export default BlogsSection
