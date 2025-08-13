import { motion } from "framer-motion"
import AlertError from "../alerts/AlertError"
import AlertWarning from "../alerts/AlertWarning"
import Loader from "../loader/Loader"
import FilterCard from "./FilterCard"

const FilterGrid = ({ tours, loading }) => {
  if (loading) return <Loader />
  return (
    <>

      {tours?.data?.length > 0 ?
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="grid grid-cols-12 gap-4 mt-6">
          {
            tours?.data?.map((tour, index) => (
              <FilterCard key={index} tour={tour} />
            ))
          }
        </motion.section >
        :
        <div className=" my-12">
          <AlertWarning >
            لا يوجد نتائج
          </AlertWarning>
        </div>
      }
    </>
  )
}

export default FilterGrid
