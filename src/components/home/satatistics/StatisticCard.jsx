import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NumberTicker } from "@/components/magicui/number-ticker";

const SatisticCard = ({ statistic, idx, isLast }) => {
  const [showOverlay, setShowOverlay] = useState(false)

  const handleIconClick = () => {
    setShowOverlay(true)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`overflow-hidden h-[300px] rounded-[105px] bg-red-500 bg-no-repeat bg-center bg-cover ${isLast ? 'col-span-12' : 'xl:col-span-4 md:col-span-6 col-span-12'
          }`}
        style={{ backgroundImage: `url(${statistic.image})` }}
      >
        <div className="w-full h-full xl:p-12 p-10 flex flex-col justify-between bg-black/50">
          <img
            src={`/statistics/icon-${idx}.svg`}
            alt="icon"
            width={55}
            height={55}
            className="ms-auto cursor-pointer"
            onClick={handleIconClick}
          />
          <div className="text-white">
            <NumberTicker value={statistic.number} className="text-6xl text-white font-bold after:content-['+']" />
            <div className="space-y-2">
              <p className="font-semibold">{statistic.title}</p>
              <p className="text-xs font-light">{statistic.description}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
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
