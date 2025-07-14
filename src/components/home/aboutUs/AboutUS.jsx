import React from 'react'
import AboutUSCard from './AboutUSCard'
import { useQuery } from '@tanstack/react-query'
import { fetchFromApi } from '../../../api/utils/fetchData'
import Loader from '../../loader/Loader'
import AlertError from '../../alerts/AlertError'
import AlertWarning from '../../alerts/AlertWarning'


const AboutUS = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['about-us'],
    queryFn: async () => {
      const res = await fetchFromApi("/about-us");
      return res;
    }
  })

  if (isLoading) return <Loader />
  if (isError) return <div className='container my-12'>
    <AlertError>
      هناك خطاء ما
    </AlertError>
  </div>
  return (
    <section className='my-16 py-16 bg-body rounded-3xl xl:rounded-[6.25rem]'>
      {data?.data?.data?.items?.length > 0 ?

        <div className='container flex flex-col max-xl:gap-4 xl:flex-row items-center justify-between' id='whySee'>
          {/* content */}
          <div className='xl:w-1/3 w-full '>
            <div className='xl:max-w-[80%]'>

              <div className=' text-center xl:text-start space-y-2 '>
                <h2 className='text-xs font-bold text-main-navy' dangerouslySetInnerHTML={{ __html: data?.data?.data?.title }}></h2>

                <h3 className='text-main-blue max-md:text-nowrap font-bold xl:text-5xl md:text-3xl text-xl xl:leading-relaxed' dangerouslySetInnerHTML={{ __html: data?.data?.data?.mainTitle }}>
                </h3>
                <p className='text-main-navy text-xs' dangerouslySetInnerHTML={{ __html: data?.data?.data?.mainDescription }}></p>
              </div>
              <div className="xl:mt-32 mt-2 flex items-center max-xl:justify-center  gap-2 w-full">
                <button className="h-8  rounded-full   bg-main-purple !text-white e hover:bg-main-blue transation-all duration-300  text-xs font-semibold px-6">إحجـــز رحلتك الان</button>
                <button className="group size-8 bg-main-purple e hover:bg-main-blue transation-all duration-300  rounded-full flex items-center justify-center">
                  <svg
                    className="text-white  "
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M-0.000356674 10.1C-0.000356674 12.0779 0.586157 14.0114 1.68502 15.656C2.78388 17.3005 4.34573 18.5823 6.17307 19.3392C8.00041 20.0961 10.0112 20.2942 11.951 19.9083C13.8909 19.5224 15.6728 18.57 17.0714 17.1714C18.47 15.7728 19.4225 13.9909 19.8083 12.051C20.1942 10.1111 19.9962 8.10037 19.2392 6.27304C18.4823 4.4457 17.2006 2.88384 15.556 1.78498C13.9114 0.686124 11.978 0.0996094 10.0001 0.0996094C8.68679 0.0996094 7.38637 0.358278 6.17307 0.860846C4.95976 1.36341 3.85732 2.10004 2.9287 3.02866C2.00007 3.95729 1.26345 5.05973 0.76088 6.27304C0.258312 7.48634 -0.000356674 8.78676 -0.000356674 10.1ZM4.38027 4.55098C4.73017 4.20108 5.90996 4.81371 6.25985 5.16361L8.41606 7.32108L8.43501 7.31477L14.4628 5.67645C14.5946 5.64847 14.731 5.65196 14.8612 5.68664C14.9914 5.72132 15.1115 5.7862 15.2119 5.87603L15.7525 6.41666C15.7931 6.45164 15.8244 6.49628 15.8432 6.54648C15.8621 6.59669 15.868 6.65083 15.8605 6.70393C15.8529 6.75703 15.8321 6.80738 15.8 6.85033C15.7679 6.89328 15.7255 6.92746 15.6767 6.94971L11.6674 9.16656L10.9639 9.87014L12.8232 11.727C13.0131 11.9399 13.1729 12.1779 13.2982 12.4343L14.6611 12.0213C14.7912 11.9898 14.927 11.9903 15.0568 12.0229C15.1866 12.0554 15.3066 12.119 15.4064 12.2082L15.5731 12.3737C15.6572 12.4578 15.7044 12.5719 15.7044 12.6908C15.7044 12.8097 15.6572 12.9237 15.5731 13.0078L14.5929 13.988L14.574 14.0057L13.8325 14.7485L13.8135 14.7674L12.8346 15.7476C12.7503 15.8314 12.6363 15.8784 12.5175 15.8784C12.3987 15.8784 12.2847 15.8314 12.2005 15.7476L12.0337 15.5809C11.9445 15.4811 11.8808 15.3612 11.8482 15.2313C11.8156 15.1015 11.8151 14.9657 11.8468 14.8356L12.2611 13.4714C12.0047 13.3456 11.7668 13.1854 11.5537 12.9952L9.69691 11.1371L8.99333 11.8394L6.77901 15.8487C6.75676 15.8975 6.72258 15.9399 6.67962 15.972C6.63667 16.0041 6.58633 16.0249 6.53323 16.0325C6.48013 16.04 6.42598 16.0341 6.37578 16.0152C6.32558 15.9963 6.28093 15.9651 6.24596 15.9245L5.70533 15.3838C5.61531 15.2833 5.55031 15.163 5.51563 15.0326C5.48094 14.9022 5.47756 14.7654 5.50575 14.6335L7.1428 8.60824L7.14912 8.58803L4.99291 6.43056C4.64301 6.08066 4.03038 4.90214 4.38027 4.55098Z" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* grid */}
          <div className='xl:w-2/3 w-full grid grid-cols-12 gap-4 '>
            {data?.data?.data?.items?.map((feature, index) => (<AboutUSCard key={index} feature={feature} />))}
          </div>
        </div> : <AlertWarning>
          لا توجد بينات متاحه الان
        </AlertWarning>}

    </section>
  )
}

export default AboutUS
