import { useParams } from 'react-router-dom'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Breadcrumbs from '../components/home/BreadCrumbs'
import { useQuery } from '@tanstack/react-query'
import { fetchFromApi } from '../api/utils/fetchData'
import BlogsSection from '../components/blogs/BlogsSection'

const SingleBlogPage = () => {
  const { slug } = useParams()
  const { data: blog, isLoading, isError } = useQuery(
    {
      queryKey: ['blog', slug],
      queryFn: async () => {
        const res = await fetchFromApi(`/blog/${slug}`)
        return res?.data?.data
      }
    }
  )

  return (
    <>
      <Header />
      <main className='container space-y-12 mb-12'>
        <div className='space-y-4'>
          <h3 className='font-bold xl:text-3xl md:text-2xl text-xl text-main-blue'>{blog?.title}</h3>
          <div className='font-semibold text-sm  flex items-center gap-2'>
            <div className='flex items-center gap-2'>
              <img src={blog?.authorImage || "/blogs/blogs.png"} alt="author" className='size-6 rounded-full object-cover' />
              <p className='text-main-purple font-bold'>{blog?.authorName || "موقع sea"}</p>
            </div>
            {
              blog?.timePublish ? <>
                <div className='size-1 bg-[#D9D9D9] rounded-full'></div>
                <span >فــي نشــرة أهــا!</span>
                <div className='size-1 bg-[#D9D9D9] rounded-full'></div>
                <span>{blog?.timePublish}</span>
              </>
                : null
            }
          </div>
          <hr />
        </div>
        <div className='h-[50vh] rounded-[40px] overflow-hidden bg-body'>
          <img src={blog?.image} alt="blog" className='w-full h-full object-cover ' />
        </div>
        <h3 className='font-bold xl:text-3xl md:text-2xl text-xl text-main-blue'>{blog?.title}</h3>
        <div className='leading-[3]' dangerouslySetInnerHTML={{ __html: blog?.description }} ></div>
        <BlogsSection title={"المــزيد من المقــالات ."} />
      </main>
      <Footer />
    </>
  )
}

export default SingleBlogPage
