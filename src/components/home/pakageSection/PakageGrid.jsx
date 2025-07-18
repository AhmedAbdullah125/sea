
import PakageCard from './PakageCard'
import AlertWarning from '../../alerts/AlertWarning'
import { motion } from 'framer-motion'

const PakageGrid = ({ data }) => {
  if (!data || data.length === 0) {
    return <AlertWarning>لا يوجد باقات متاحه الان</AlertWarning>
  }

  return (
    <div className='grid grid-cols-10 xl:gap-x-4 xl:gap-y-10 gap-4'>
      {data.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="col-span-10 md:col-span-5 xl:col-span-2"
        >
          <PakageCard item={item} />
        </motion.div>
      ))}
    </div>
  )
}

export default PakageGrid
