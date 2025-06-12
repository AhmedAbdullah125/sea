import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PakageGrid from "./PakageGrid"
import { useQuery } from "@tanstack/react-query"
import { fetchFromApi } from "../../../api/utils/fetchData"

const PakageSection = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['continents'],
        queryFn: async () => {
          const res = await fetchFromApi("/continents");
          return res;
        }
    
  })
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  return (
    <section className="my-16 xl:my-24 container">
      <Tabs defaultValue={data?.data?.data[0]?.id} className="w-full xl:space-y-12 space-y-8" dir="rtl">
        <div className="flex flex-col xl:flex-row items-center justify-between max-xl:space-y-8">
          <div className="text-center xl:text-start">
            <h2 className='xl:text-3xl md:text-2xl text-xl  font-bold text-main-blue '>إختر بـــــاقتك حول العالم !.</h2>
            <p className="text-xs font-light text-main-navy mt-4">سواء كنت تحلم بالسفر إلى أوروبا، آسيا، إفريقيا، أستراليا أو أمريكا، نوفر لك خيارات إقامة متنوعة بأسعار تناسب ميزانيتك.</p>
          </div>
          <TabsList className="h-fit flex items-center gap-2 flex-wrap ">
            {data?.data?.data?.map((item) =>
              <TabsTrigger key={item?.id} value={item?.id} className="flex-grow bg-[#F2F2F2] text-black w-24 h-12 text-xs font-semibold rounded-full data-[state=active]:shadow-none data-[state=active]:bg-main-blue data-[state=active]:text-white">{item.name }</TabsTrigger>
          )
            }
        </TabsList>
        </div>
        {data?.data?.data?.map((item) =>
          <TabsContent key={item?.id} value={item?.id}><PakageGrid continentId={item?.id } /></TabsContent>
        )
        }

      </Tabs>
    </section>
  )
}

export default PakageSection
