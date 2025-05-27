import { GoArrowUpLeft } from 'react-icons/go'
import styles from './totalHotel.module.css'
import { TiStarFullOutline } from 'react-icons/ti'
import { Link } from 'react-router-dom'

const TotalHotelCard = () => {
  return (
    <div className='col-span-12 md:col-span-6 xl:col-span-3 relative'>
      <div className={`${styles.card} ${styles.bottomLeft} p-6`} style={{ backgroundImage: `url('/home/hero.png')` }}>
        {/* content */}
        <div className='flex flex-col gap-3 text-white'>
          <h3 h3 className="  font-bold text-3xl leading-relaxed" > قصر تشراغان كمبنسكي إسطنبول</h3 >
          <p className=" text-xs line-clamp-1">فندق بوتيكي فاخر يتميز بإطلالات خلابة على البحيرة.</p>
          {/* rate */}
          <div div className="flex items-start gap-1 " >
            <TiStarFullOutline size={14} className="text-yellow-500" />
            <p className="p-0 m-0 text-xs ">5.0 ( 500+ )</p>
          </div >
        </div>
      </div>
      <Link to="/" className={`absolute bottom-2 end-2 size-14  bg-main-blue  text-white  text-xs font-semibold flex items-center justify-center rounded-full border-2 border-main-blue hover:bg-white hover:text-main-blue`}>
        <GoArrowUpLeft size={20} />
      </Link>
    </div>
  )
}

export default TotalHotelCard
