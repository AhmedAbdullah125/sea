import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useQuery } from "@tanstack/react-query";
import { fetchFromApi } from "../../api/utils/fetchData";
import BlogsSection from "./BlogsSection";
import BlogsCategoriesSection from "./BlogsCategoriesSection";

const BlogCategories = () => {

  const { data, isLoading } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const res = await fetchFromApi("/category-with-blogs");
      return res?.data?.data;
    }
  })
  const { data:all, isLoading:isLoadingAll } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await fetchFromApi("/blogs");
      return res;
    }
  })
  if(!data?.length) return null
  return (
    data?.length === 0 ? null :
      <Tabs defaultValue={data[0]?.name} className="w-full space-y-4" dir="rtl">
        <TabsList className="h-fit flex justify-start items-center gap-2 flex-wrap ">
          <TabsTrigger className="px-10 max-xl:flex-grow bg-[#F2F2F2] text-black  h-12 text-xs font-semibold rounded-full data-[state=active]:shadow-none data-[state=active]:bg-main-navy data-[state=active]:text-white" value={"all"}>{all?.data?.data.length }</TabsTrigger>
          {
            data?.map((item, idx) => (
              <TabsTrigger key={idx} className="max-xl:flex-grow bg-[#F2F2F2] text-black  h-12 text-xs font-semibold rounded-full data-[state=active]:shadow-none data-[state=active]:bg-main-navy data-[state=active]:text-white" value={item?.name}>{item?.name}</TabsTrigger>
            ))}
        </TabsList>
        <TabsContent  value={"all"} className="flex flex-col gap-4">
          <BlogsCategoriesSection data={all?.data?.data} isLoading={isLoadingAll} />
        </TabsContent>
        {
          data?.map((item, idx) => (
            <TabsContent key={idx} value={item?.name} className="flex flex-col gap-4">
              <BlogsCategoriesSection data={item?.blogs} isLoading={isLoading} />
            </TabsContent>
          ))
        }
      </Tabs>
  )
}

export default BlogCategories
