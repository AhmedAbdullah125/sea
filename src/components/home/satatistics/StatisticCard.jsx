import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NumberTicker } from "@/components/magicui/number-ticker";

const SatisticCard = ({ statistic, idx, layout }) => {
  const [showOverlay, setShowOverlay] = useState(false)

  const handleIconClick = () => {
    setShowOverlay(true)
  }

  return (
    <>

      <div
        className={`${layout} overflow-hidden h-[300px] rounded-[105px] bg-red-500 bg-no-repeat bg-center bg-cover `}
        style={{ backgroundImage: `url(${statistic.image})` }}
      >
        <div className="w-full h-full xl:p-12 p-10 flex flex-col justify-between bg-black/50">
       <div className=""></div>
          <div className="text-white">
            <NumberTicker value={statistic.number} className="text-6xl text-white font-bold after:content-['+']" />
            <div className="space-y-2">
              <p className="font-semibold">{statistic.title}</p>
              <p className="text-xs font-light">{statistic.description}</p>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-[999999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowOverlay(false)}
          >
            <motion.img
              src={statistic.image}
              alt="Statistic Large"
              className="max-w-[90%] max-h-[90%] rounded-xl shadow-xl"
              initial={{ scale: 1 }}
              animate={{ scale: 1.2 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()} // يمنع غلق الاوفرلاي لما تدوس ع الصورة نفسها
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default SatisticCard
