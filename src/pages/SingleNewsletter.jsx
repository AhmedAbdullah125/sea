import NewsletterBody from '../components/blogs/NewsletterBody'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import BlogSection from '../components/blogs/BlogsSection'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
const SingleNewsletter = () => {
  return (
    <>
      <Header />
      <main className='container space-y-12 mb-12'>
        <NewsletterBody />
        <Tabs defaultValue="all" className="w-full space-y-4" dir="rtl">
          <TabsList className="h-fit flex justify-start items-center gap-2 flex-wrap ">
            <TabsTrigger className="max-xl:flex-grow bg-[#F2F2F2] text-black w-24 h-12 text-xs font-semibold rounded-full data-[state=active]:shadow-none data-[state=active]:bg-main-navy data-[state=active]:text-white" value="all">118</TabsTrigger>
            <TabsTrigger className="max-xl:flex-grow bg-[#F2F2F2] text-black w-24 h-12 text-xs font-semibold rounded-full data-[state=active]:shadow-none data-[state=active]:bg-main-navy data-[state=active]:text-white" value="blog">المقالات</TabsTrigger>
            <TabsTrigger className="max-xl:flex-grow bg-[#F2F2F2] text-black w-24 h-12 text-xs font-semibold rounded-full data-[state=active]:shadow-none data-[state=active]:bg-main-navy data-[state=active]:text-white" value="video">الفيديو</TabsTrigger>
            <TabsTrigger className="max-xl:flex-grow bg-[#F2F2F2] text-black w-24 h-12 text-xs font-semibold rounded-full data-[state=active]:shadow-none data-[state=active]:bg-main-navy data-[state=active]:text-white" value="pod">بودكاست</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <BlogSection />
          </TabsContent>
          <TabsContent value="blog">
            <BlogSection />
          </TabsContent>
          <TabsContent value="video">
            <BlogSection />
          </TabsContent>
          <TabsContent value="pod">
            <BlogSection />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />

    </>
  )
}

export default SingleNewsletter
