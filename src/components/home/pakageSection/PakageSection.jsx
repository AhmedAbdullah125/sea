import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PakageGrid from "./PakageGrid"

const PakageSection = () => {
  return (
    <section className="my-16 xl:my-24 container">

      <Tabs defaultValue="eru" className="w-full xl:space-y-12 space-y-8" dir="rtl">
        <div className="flex flex-col xl:flex-row items-center justify-between max-xl:space-y-8">
          <div className="text-center xl:text-start">
            <h2 className='xl:text-3xl md:text-2xl text-xl  font-bold text-main-blue '>إختر بـــــاقتك حول العالم !.</h2>
            <p className="text-xs font-light text-main-navy mt-4">سواء كنت تحلم بالسفر إلى أوروبا، آسيا، إفريقيا، أستراليا أو أمريكا، نوفر لك خيارات إقامة متنوعة بأسعار تناسب ميزانيتك.</p>
          </div>

        <TabsList className="h-fit flex items-center gap-2 flex-wrap ">
          <TabsTrigger value="eru" className="flex-grow bg-[#F2F2F2] text-black w-24 h-12 text-xs font-semibold rounded-full data-[state=active]:shadow-none data-[state=active]:bg-main-blue data-[state=active]:text-white">أوروبا</TabsTrigger>
          <TabsTrigger value="asia" className="flex-grow bg-[#F2F2F2] text-black w-24 h-12 text-xs font-semibold rounded-full data-[state=active]:shadow-none data-[state=active]:bg-main-blue data-[state=active]:text-white">آسيا</TabsTrigger>
          <TabsTrigger value="africa" className="flex-grow bg-[#F2F2F2] text-black w-24 h-12 text-xs font-semibold rounded-full data-[state=active]:shadow-none data-[state=active]:bg-main-blue data-[state=active]:text-white">إفريقيا</TabsTrigger>
          <TabsTrigger value="austr" className="flex-grow bg-[#F2F2F2] text-black w-24 h-12 text-xs font-semibold rounded-full data-[state=active]:shadow-none data-[state=active]:bg-main-blue data-[state=active]:text-white">أستراليا</TabsTrigger>
          <TabsTrigger value="amrica" className="flex-grow bg-[#F2F2F2] text-black w-24 h-12 text-xs font-semibold rounded-full data-[state=active]:shadow-none data-[state=active]:bg-main-blue data-[state=active]:text-white">أمريكا</TabsTrigger>
        </TabsList>
        </div>
        <TabsContent value="eru"><PakageGrid/></TabsContent>
        <TabsContent value="asia"><PakageGrid/></TabsContent>
        <TabsContent value="africa"><PakageGrid/></TabsContent>
        <TabsContent value="austr"><PakageGrid/></TabsContent>
        <TabsContent value="amrica"><PakageGrid/></TabsContent>
      </Tabs>
    </section>
  )
}

export default PakageSection
