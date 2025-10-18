import React, { useState } from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import BreadCrumb from '../components/global/BreadCrumb'
import Newsletter from '../components/blogs/Newsletter'
import BlogsSection from '../components/blogs/BlogsSection'
import { useQuery } from '@tanstack/react-query'
import { fetchFromApi } from '../api/utils/fetchData'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import blogimg from "../../public/blogs/blogs.png"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const Blogs = () => {
  const lang = localStorage.getItem('lang') || 'ar';
  const { data, isLoading } = useQuery({
    queryKey: ['blogs' + lang],
    queryFn: async () => {
      const res = await fetchFromApi("/blogs");
      return res;
    }
  })

  return (
    <>
      <Header />
      <div className="flex items-center justify-between container" style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
        <BreadCrumb data={[{ title: lang === 'ar' ? "الرئيسية" : "Home", href: "/" }, { title: lang === 'ar' ? "المدونة" : "Blogs", href: "/blogs" }]} />
        {/* language  */}
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 rounded-xl bg-main-navy text-white hover:bg-main-purple hover:text-white">{lang === 'ar' ? 'اللغة' : 'Language'} <i className="fa-solid fa-globe"></i></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white w-56 rounded-md overflow-hidden" align="start">
            <DropdownMenuItem onClick={() => {
              localStorage.setItem('lang', 'ar')
              window.location.reload()
            }}>
              العربية
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              localStorage.setItem('lang', 'en');
              window.location.reload()
            }}>
              English
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <main className='container space-y-12 mb-12' style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className='relative overflow-hidden bg-main-navy rounded-[40px] py-12 px-10 xl:flex justify-around items-center'>
          <div className='text-white font-semibold space-y-4 max-xl:text-center'>
            <h1 className='text-3xl xl:text-5xl font-bold '>{lang === 'ar' ? "مدونـــــة ســــي / Sea..." : "Sea Blogs..."}</h1>
            <p className='leading-8'>{lang === 'ar' ? "أول مدونة عربية متخصصة بالنشرات البريدية في القطاع السياحي." : "The first Arabic blog specialized in publishing newsletters in the tourism sector."}</p>
          </div>
          <img src={blogimg} alt="blog" className='hidden xl:block' />
          <div className='hidden xl:block size-16 rounded-[20px] bg-body/10 absolute top-6 end-[40%]'></div>
          <div className='hidden xl:block size-16 rounded-[20px] bg-body/10 absolute top-16 end-[38%]'></div>
          <div className='hidden xl:block size-16 rounded-[20px] bg-body/10 absolute bottom-6 end-6'></div>
          <div className='hidden xl:block size-16 rounded-[20px] bg-body/10 absolute -bottom-2 -end-2'></div>
        </motion.div>
        {/* newsletter */}
        <Newsletter lang={lang} />
        {/* blogs */}
        <BlogsSection data={data} isLoading={isLoading} title={lang === 'ar' ? "المقالات الجديـــــــــــده ." : "Latest Blogs."} lang={lang} />
      </main>
      <Footer />
    </>
  )
}

export default Blogs
