import { useQuery } from '@tanstack/react-query'
import BlogCard from './BlogCard'
import { fetchFromApi } from '../../api/utils/fetchData';
import Loader from '../loader/Loader';
import AlertWarning from '../alerts/AlertWarning';
const BlogsSection = ({title}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await fetchFromApi("/blogs");
      return res;
    }
  })
  if (isLoading) return <Loader />

  return (
    <section className='space-y-12'>
      <h2 className='xl:text-3xl md:text-2xl text-xl  font-bold text-main-blue max-xl:text-center'>{title}</h2>
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
