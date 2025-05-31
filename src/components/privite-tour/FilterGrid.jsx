import FilterCard from "./FilterCard"


const FilterGrid = () => {
  return (
    <section className="grid grid-cols-12 gap-4 mt-6">
      {
        Array.from({ length: 12 }).map((_, index) => (
          <FilterCard key={index} />
        ))
      }
    </section >
  )
}

export default FilterGrid
