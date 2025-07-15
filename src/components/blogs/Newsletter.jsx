import React from 'react'
import NewsletterCard from './NewsletterCard'

const Newsletter = () => {
  return (
    <section className='space-y-12'>
      <h2 className='xl:text-3xl md:text-2xl text-xl  font-bold text-main-blue max-xl:text-center'>نشــرات بريديّــة مميّــزة.</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 '>
        <NewsletterCard />
        <NewsletterCard />
        <NewsletterCard />
        <NewsletterCard />
        <NewsletterCard />
      </div>
    </section>
  )
}

export default Newsletter

