import AlertWarning from '../alerts/AlertWarning';
import Loader from '../loader/Loader';
import BlogCard from './BlogCard';
const BlogsSection = ({ title, data, isLoading }) => {

  if (isLoading) return <Loader />

  return (
    <section className='space-y-12'>
      {title &&
        <h2 className='xl:text-3xl md:text-2xl text-xl  font-bold text-main-blue max-xl:text-center'>{title}</h2>
      }
      {data?.data?.data?.length == 0 ?
        <AlertWarning >
          لا يوجد مقالات متاحه الآن
        </AlertWarning>
        :
        <div className='grid grid-col-1 md:grid-cols-2 gap-4'>
          {
            data?.data?.data?.map((blog, index) => (
              <BlogCard key={index} blog={blog} />
            ))
          }
        </div>
      }
    </section>
  )
}

export default BlogsSection
