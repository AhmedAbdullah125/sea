import React from 'react'
import NewsletterCard from './NewsletterCard'
import { useQuery } from '@tanstack/react-query'
import { fetchFromApi } from '../../api/utils/fetchData'
import Loader from '../loader/Loader'

const Newsletter = () => {
  const colors = [
    "#C69E9E",
    "#FB7830",
    "#77AC7B",
    "#F4D266",
    "#DCE0BB"
  ]
  const { data, isLoading } = useQuery({
    queryKey: ["newsletters"],
    queryFn: async () => {
      const res = await fetchFromApi("/newsletters");
      return res?.data?.data;
    }
  })
  if (isLoading) return <Loader />

  return (
    data?.length === 0 ? null :
      <section className='space-y-12'>
        <h2 className='xl:text-3xl md:text-2xl text-xl  font-bold text-main-blue max-xl:text-center'>نشــرات بريديّــة مميّــزة.</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 '>
          {data.map((item, index) => {
            const color = colors[index % colors.length]; 
            return (
              <NewsletterCard item={item} key={index} bgColor={color} />
            )
          })}
        </div>
      </section>
  )
}

export default Newsletter

