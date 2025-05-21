import PakageCard from './PakageCard'
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

const PakageGrid = () => {
  return (
    <div className='grid grid-cols-12 xl:gap-x-4 xl:gap-y-10 gap-4'>
      {pakages.map((item, index) => (<PakageCard key={index} imgSrc={item} />))}
    </div>
  )
}

export default PakageGrid
