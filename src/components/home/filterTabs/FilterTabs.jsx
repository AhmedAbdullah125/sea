import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HotelsForm from "./HotelsForm"
import { IoLogoApple, IoLogoGooglePlaystore, IoLogoWhatsapp } from "react-icons/io5";
import PackageForm from "./PackageForm";
import TransportForm from "./TransportForm";
import VisaLinks from "./VisaLinks";
import TableForm from "./TableForm";

const links = [{
  icon: (< IoLogoApple size={20} />),
  href: "#",
},
{
  icon: (< IoLogoGooglePlaystore size={20} />),
  href: "#",
},
{
  icon: (< IoLogoWhatsapp size={20} />),
  href: "#",
},


]

const triggerStyle = "p-0 pb-2 relative data-[state=active]:shadow-none data-[state=active]:text-main-purple data-[state=active]:before:h-1 data-[state=active]:before:w-3 data-[state=active]:before:rounded-full data-[state=active]:before:absolute data-[state=active]:before:bottom-0 data-[state=active]:before:bg-main-purple data-[state=active]:before:translate-x-1/2 data-[state=active]:before:start-1/2 text-xs font-semibold data-[state=active]:font-bold   "
const FilterTabs = () => {
  return (
    <div className="relative">
      <Tabs dir="rtl" defaultValue="hotels" className="w-full text-main-navy bg-white py-6 px-8 rounded-[40px]">
        <TabsList className="flex items-center justify-start gap-6 flex-wrap h-fit max-md:justify-center">
          <TabsTrigger className={triggerStyle} value="hotels">فنــادق و شقق</TabsTrigger>
          <TabsTrigger className={triggerStyle} value="package">بــاقات حــول العــالم</TabsTrigger>
          <TabsTrigger className={triggerStyle} value="transport">النقل والمواصلات</TabsTrigger>
          <TabsTrigger className={triggerStyle} value="visa">التــأشيــرات</TabsTrigger>
          <TabsTrigger className={triggerStyle} value="table">جدولك عليـــنا</TabsTrigger>
        </TabsList>
        <TabsContent value="hotels"><HotelsForm /></TabsContent>
        <TabsContent value="package"><PackageForm /></TabsContent>
        <TabsContent value="transport"><TransportForm /></TabsContent>
        <TabsContent value="visa"><VisaLinks/></TabsContent>
        <TabsContent value="table"><TableForm/></TabsContent>
      </Tabs>
      {/* social links  */}
      <div className="space-y-3 absolute bottom-0 -end-16 max-xl:hidden">
        {
          links.map((link, i) => (
            <a href={link.href} className="bolck size-12  bg-white text-black rounded-2xl flex items-center justify-center hover:text-main-purple" key={i}>
              {link.icon}
            </a>
          ))
        }

      </div>
    </div>
  )
}

export default FilterTabs
