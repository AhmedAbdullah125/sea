import React from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import BreadCrumb from '../components/global/BreadCrumb'
import Newsletter from '../components/blogs/Newsletter'
import BlogsSection from '../components/blogs/BlogsSection'

const BlogsPage = () => {
  return (
    <>
      <Header />
      <BreadCrumb data={[{ title: "الرئيسية", href: "/" }, { title: "المدونة", href: "/blogs" }]} />
      <main className='container space-y-12 mb-12'>
        {/* header */}
        <div className='relative overflow-hidden bg-main-navy rounded-[40px] py-12 px-10 xl:flex justify-around items-center'>
          <div className='text-white font-semibold space-y-4 max-xl:text-center'>
            <h1 className='text-3xl xl:text-5xl font-bold '>مدونـــــة ســــي / Sea...</h1>
            <p className='leading-8'>أول مدونة عربية متخصصة بالنشرات البريدية في القطاع السياحي.</p>
          </div>
          <img src="/blogs/blogs.png" alt="blog" className='hidden xl:block' />
          <div className='hidden xl:block size-16 rounded-[20px] bg-body/10 absolute top-6 end-[40%]'></div>
          <div className='hidden xl:block size-16 rounded-[20px] bg-body/10 absolute top-16 end-[38%]'></div>
          <div className='hidden xl:block size-16 rounded-[20px] bg-body/10 absolute bottom-6 end-6'></div>
          <div className='hidden xl:block size-16 rounded-[20px] bg-body/10 absolute -bottom-2 -end-2'></div>
        </div>
        {/* newsletter */}
        <Newsletter />
        {/* blogs */}
        <BlogsSection title={"المقالات الجديـــــــــــده ."}/>
      </main>
      <Footer />
    </>
  )
}

export default BlogsPage
