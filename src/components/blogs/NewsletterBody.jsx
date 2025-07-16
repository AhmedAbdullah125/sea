import React from 'react'
import NewsletterForm from './NewsletterForm'
import { useQuery } from '@tanstack/react-query';
import { fetchFromApi } from '../../api/utils/fetchData';
import Loader from '../loader/Loader';

const NewsletterBody = ({ slug }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['newsletters', slug],
    queryFn: async () => {
      const res = await fetchFromApi(`/newsletters/${slug}`);
      return res;
    }
  });

  if (isLoading) return <Loader />
  return (
    <div className='bg-body rounded-[40px] px-6 py-10 flex flex-col xl:flex-row items-center gap-4'>
      <div className='space-y-4 h-[220px] xl:w-[20%] rounded-[65px] p-10 flex items-end ' style={{ backgroundColor: `#FB7830` }}>
        <h3 className='xl:text-2xl font-bold'>
          {data?.data?.data?.title}
        </h3>
      </div>
      {/* content */}
      <div className='space-y-3'>
        <h1 className='xl:text-3xl md:text-2xl text-xl font-bold text-main-blue'>{data?.data?.data?.title}</h1>
        <div className='text-xs font-semibold  flex items-center gap-2'>
          <p className='text-main-purple'>{data?.data?.data?.period}</p>
          <img src="/blogs/pepole.png" alt="pepole" />
        </div>
        <p className='text-sm font-medium leading-relaxed'>{data?.data?.data?.description}</p>
        <NewsletterForm id={data?.data?.data?.id} />
      </div>
    </div>
  )
}

export default NewsletterBody
