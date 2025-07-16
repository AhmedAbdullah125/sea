import AlertWarning from '../alerts/AlertWarning';
import Loader from '../loader/Loader';
import BlogCard from './BlogCard';
const BlogsCategoriesSection = ({  data, isLoading }) => {

  if (isLoading) return <Loader />

  return (
    <section className='space-y-12'>

      {data?.length == 0 ?
        <AlertWarning >
          لا يوجد مقالات متاحه الآن
        </AlertWarning>
        :
        <div className='grid grid-col-1 md:grid-cols-2 gap-4'>
          {
            data?.map((blog, index) => (
              <BlogCard key={index} blog={blog} />
            ))
          }
        </div>
      }
    </section>
  )
}

export default BlogsCategoriesSection
