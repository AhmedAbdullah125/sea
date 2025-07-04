import { useQuery } from '@tanstack/react-query'
import PakageCard from './PakageCard'
import { postToApi } from '../../../api/utils/postData'
import AlertWarning from '../../alerts/AlertWarning'
import Loader from '../../loader/Loader'
import AlertError from '../../alerts/AlertError'
const pakages = [
  "/pakages/pakage-1.png",
  "/pakages/pakage-2.png",
  "/pakages/pakage-3.png",
  "/pakages/pakage-4.png",
  "/pakages/pakage-5.png",
  "/pakages/pakage-6.png",
  "/pakages/pakage-7.png",
  "/pakages/pakage-8.png",

]

const PakageGrid = ({ continentId }) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: [`plan-contient-${continentId}`],
    queryFn: async () => {
      const res = await postToApi("filter-plans", {}, {
        params: { continent: continentId },
      });
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
        <div className='grid grid-cols-12 xl:gap-x-4 xl:gap-y-10 gap-4'>
          {data?.data?.data?.map((item, index) => (<PakageCard key={index} item={item} />))}
        </div> :
        <AlertWarning>لا يوجد باقات متاحه الان</AlertWarning>
      }
    </>
  )
}

export default PakageGrid
