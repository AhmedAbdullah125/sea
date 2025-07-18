import { useQuery } from '@tanstack/react-query'
import { fetchFromApi } from '../../../api/utils/fetchData'
import AlertError from '../../alerts/AlertError'
import AlertWarning from '../../alerts/AlertWarning'
import Loader from '../../loader/Loader'
import PakageCard from './PakageCard'
import { motion } from 'framer-motion'


const AllPackages = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      const res = await fetchFromApi("/plans");
      return res;
    }
  })  
  if (isLoading) return <Loader />
  if (isError) return <div className="container my-12"><AlertError>
    هناك خطاء ما
  </AlertError></div>
  return (
    <>
      {data?.data?.data.length > 0 ?
        <div className='grid grid-cols-10 xl:gap-x-4 xl:gap-y-10 gap-4'>
          {data?.data?.data?.map((item, index) => (<motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="col-span-10 md:col-span-5 xl:col-span-2"
          >
            <PakageCard item={item} />
          </motion.div>))}
        </div> :
        <AlertWarning>لا يوجد باقات متاحه الان</AlertWarning>
      }
    </>
  )
}

export default AllPackages