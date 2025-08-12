import { GoArrowUpLeft } from 'react-icons/go'
import styles from './totalHotel.module.css'
import { TiStarFullOutline } from 'react-icons/ti'
import { Link } from 'react-router-dom'

const TotalHotelCard = ({ hotel }) => {
  return (
    <div className={` relative w-full`}>
      <div className={`${styles.inverted} bg-no-repeat bg-center bg-cover rounded-[40px] overflow-hidden`} style={{ backgroundImage: `url(${hotel?.images[0]}) ` }}>
        <div className="w-full h-full bg-black/30 flex flex-col justify-between" >
          {/* content */}
          <div className='flex flex-col gap-3 text-white  h-full p-8'>
            <h3 h3 className="  font-bold text-2xl leading-relaxed" > {hotel?.title}</h3 >
            <p className=" text-xs line-clamp-1">{hotel?.address}</p>
            {/* rate */}
            <div div className="flex items-start gap-1 " >
              <TiStarFullOutline size={14} className="text-yellow-500" />
              <p className="p-0 m-0 text-xs ">{parseFloat(hotel?.rating).toFixed(0)} ({hotel?.likes} )</p>
            </div >
          </div>
        </div>
      </div>

      <Link to={`/hotel/${hotel?.slug}`} className={`absolute -bottom-1 -end-1 size-10  bg-main-blue  !text-white  text-xs font-semibold flex items-center justify-center rounded-full  hover:bg-main-purple transition-all duration-300`}>
        <GoArrowUpLeft size={20} />
      </Link>
    </div>
  )
}

export default TotalHotelCard
