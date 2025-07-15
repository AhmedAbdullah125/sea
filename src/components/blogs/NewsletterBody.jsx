import React from 'react'
import NewsletterForm from './NewsletterForm'

const NewsletterBody = () => {
  return (
    <div className='bg-body rounded-[40px] px-6 py-10 flex flex-col xl:flex-row items-center gap-4'>
      <div className='space-y-4 h-[220px] xl:w-[20%] rounded-[65px] p-10 flex items-end ' style={{ backgroundColor: `#FB7830` }}>
        <h3 className='xl:text-xl font-bold'>
          الأكثــر قــــــــــــــراءة.
        </h3>
      </div>
      {/* content */}
      <div className='space-y-3'>
        <h1 className='xl:text-3xl md:text-2xl text-xl font-bold text-main-blue'>النشرة السينمائية.</h1>
        <div className='text-xs font-semibold  flex items-center gap-2'>
          <p>أسبـوعيـة، الخميـس.</p>
          <img src="/blogs/pepole.png" alt="pepole" />
          <p className='text-main-purple '>36 متابع في آخر 7 أيام</p>
        </div>
        <p className='text-sm font-medium leading-relaxed'>مقالات ومراجعات سينمائية أبسط من فلسفة النقّاد وأعمق من سوالف اليوتيوبرز. وتوصيات موزونة لا تخضع لتحيّز الخوارزميات، مع جديد المنصات والسينما، وأخبار الصناعة محلّيًا وعالميًا.. في نشرة تبدأ بها عطلتك كل خميس.</p>
        <NewsletterForm />
      </div>
    </div>
  )
}

export default NewsletterBody
