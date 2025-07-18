import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const AboutUSCard = ({feature}) => {
  return (
    <Card className="shadow-none border-none flex flex-col justify-center bg-white p-8 rounded-[90px]  space-y-2 h-fit">
      <CardHeader className="p-0">
        <img src={feature?.icon} alt="icon" loading="lazy" width={60} height={60} className="rounded-full size-16" />
      </CardHeader>
      <CardContent className="p-0 py-4 w-fit relative before:w-8 before:h-[5px] before:bg-main-blue before:rounded-full before:absolute before:start-0 before:bottom-0">
        <img src="/aboutUs/about-victor.svg" alt="icon" loading="lazy" className="absolute -top-3 -end-4"/>
        <h3 className="font-semibold text-main-navy xl:text-2xl text-nowrap text-xl relative">{feature?.title}</h3>
      </CardContent>
      <CardFooter className="p-0">
        <p className="text-sm xl:text-basetext-main-navy line-clamp-3 leading-loose">{feature?.description}</p>
      </CardFooter>
    </Card>
  )
}

export default AboutUSCard
