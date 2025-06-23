import AlertError from "../alerts/AlertError"
import AlertWarning from "../alerts/AlertWarning"
import Loader from "../loader/Loader"
import FilterCard from "./FilterCard"


const FilterGrid = ({ tours, loading }) => {
  if (loading) return <Loader />
  return (
    <>

      {tours?.data?.length > 0 ?
        <section className="grid grid-cols-12 gap-4 mt-6">
          {
            tours?.data?.map((tour, index) => (
              <FilterCard key={index} tour={tour} />
            ))
          }
        </section >
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
