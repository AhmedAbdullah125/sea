// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import PakageGrid from "./PakageGrid"
// import { useQuery } from "@tanstack/react-query"
// import { fetchFromApi } from "../../../api/utils/fetchData"
// import Loader from "../../loader/Loader"
// import AlertWarning from "../../alerts/AlertWarning"
// import AlertError from "../../alerts/AlertError"
// import AllPackages from "./AllPackages"
// import { useState } from "react"

// const PakageSection = () => {
// const [emptyTabs, setEmptyTabs] = useState([]);
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['continents'],
//     queryFn: async () => {
//       const res = await fetchFromApi("/continents");
//       return res;
//     }
//   })


//   if (isLoading) return <Loader />
//   if (isError) return <div className="container my-12"><AlertError>
//     هناك خطاء ما
//   </AlertError></div>
//   return (
//     <section className="my-16 xl:my-24 container">
//       <Tabs defaultValue="all" className="w-full xl:space-y-12 space-y-8" dir="rtl">
//         <div className="flex flex-col xl:flex-row items-center justify-between max-xl:space-y-8">
//           <div className="text-center xl:text-start">
//             <h2 className='xl:text-3xl md:text-2xl text-xl font-bold text-main-blue'>إختر بـــــاقتك حول العالم !.</h2>
//             <p className="text-xs font-light text-main-navy mt-4">
//               سواء كنت تحلم بالسفر إلى أوروبا، آسيا، إفريقيا، أستراليا أو أمريكا، نوفر لك خيارات إقامة متنوعة بأسعار تناسب ميزانيتك.
//             </p>
//           </div>
//           <TabsList className="h-fit flex items-center gap-2 flex-wrap">
//             <TabsTrigger
//               value="all"
//               className="flex-grow bg-[#F2F2F2] text-black w-24 h-12 text-xs font-semibold rounded-full data-[state=active]:shadow-none data-[state=active]:bg-main-blue data-[state=active]:text-white"
//             >
//               الكل
//             </TabsTrigger>
//             {data?.data?.data?.map((item) =>
//               !emptyTabs.includes(item?.id) && (
//                 <TabsTrigger
//                   key={item?.id}
//                   value={item?.id}
//                   className="flex-grow bg-[#F2F2F2] text-black w-24 h-12 text-xs font-semibold rounded-full data-[state=active]:shadow-none data-[state=active]:bg-main-blue data-[state=active]:text-white"
//                 >
//                   {item.name}
//                 </TabsTrigger>
//               )
//             )}
//           </TabsList>
//         </div>

//         <TabsContent value="all">
//           <AllPackages />
//         </TabsContent>

//         {data?.data?.data?.map((item) =>
//           !emptyTabs.includes(item?.id) && (
//             <TabsContent key={item?.id} value={item?.id}>
//               <PakageGrid continentId={item?.id} setEmptyTabs={setEmptyTabs} />
//             </TabsContent>
//           )
//         )}

//       </Tabs>
//     </section>
//   )
// }

// export default PakageSection


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PakageGrid from "./PakageGrid"
import { useQuery } from "@tanstack/react-query"
import { fetchFromApi } from "../../../api/utils/fetchData"
import { postToApi } from "../../../api/utils/postData"
import Loader from "../../loader/Loader"
import AlertWarning from "../../alerts/AlertWarning"
import AlertError from "../../alerts/AlertError"
import AllPackages from "./AllPackages"
import { useState, useEffect } from "react"

const PakageSection = () => {
  const [packagesByContinent, setPackagesByContinent] = useState({})
  const [emptyTabs, setEmptyTabs] = useState([])

  const { data: continentsData, isLoading, isError } = useQuery({
    queryKey: ['continents'],
    queryFn: async () => {
      const res = await fetchFromApi("/continents")
      return res?.data?.data
    }
  })

  useEffect(() => {
    const fetchPackages = async () => {
      if (!continentsData) return

      const results = await Promise.all(
        continentsData.map(async (continent) => {
          const res = await postToApi("filter-plans", {}, { params: { continent: continent.id } })
          return { continentId: continent.id, data: res?.data?.data || [] }
        })
      )

      const empty = []
      const packagesMap = {}

      results.forEach(({ continentId, data }) => {
        packagesMap[continentId] = data
        if (data.length === 0) {
          empty.push(continentId)
        }
      })

      setPackagesByContinent(packagesMap)
      setEmptyTabs(empty)
    }

    fetchPackages()
  }, [continentsData])

  if (isLoading) return <Loader />
  if (isError) return <div className="container my-12"><AlertError>هناك خطاء ما</AlertError></div>

  return (
    <section className="my-16 xl:my-24 container">
      <Tabs defaultValue="all" className="w-full xl:space-y-12 space-y-8" dir="rtl">
        <div className="flex flex-col xl:flex-row items-center justify-between max-xl:space-y-8">
          <div className="text-center xl:text-start">
            <h2 className='xl:text-3xl md:text-2xl text-xl font-bold text-main-blue'>إختر بـــــاقتك حول العالم !.</h2>
            <p className="text-xs font-light text-main-navy mt-4">
              سواء كنت تحلم بالسفر إلى أوروبا، آسيا، إفريقيا، أستراليا أو أمريكا، نوفر لك خيارات إقامة متنوعة بأسعار تناسب ميزانيتك.
            </p>
          </div>
          <TabsList className="h-fit flex items-center gap-2 flex-wrap">
            <TabsTrigger
              value="all"
              className="flex-grow bg-[#F2F2F2] text-black w-24 h-12 text-xs font-semibold rounded-full data-[state=active]:shadow-none data-[state=active]:bg-main-blue data-[state=active]:text-white"
            >
              الكل
            </TabsTrigger>
            {continentsData?.map((continent) =>
              !emptyTabs.includes(continent.id) && (
                <TabsTrigger
                  key={continent.id}
                  value={continent.id}
                  className="flex-grow bg-[#F2F2F2] text-black w-24 h-12 text-xs font-semibold rounded-full data-[state=active]:shadow-none data-[state=active]:bg-main-blue data-[state=active]:text-white"
                >
                  {continent.name}
                </TabsTrigger>
              )
            )}
          </TabsList>
        </div>

        <TabsContent value="all">
          <AllPackages />
        </TabsContent>

        {continentsData?.map((continent) =>
          !emptyTabs.includes(continent.id) && (
            <TabsContent key={continent.id} value={continent.id}>
              <PakageGrid data={packagesByContinent[continent.id] || []} />
            </TabsContent>
          )
        )}
      </Tabs>
    </section>
  )
}

export default PakageSection
