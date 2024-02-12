import {Open_Sans} from "next/font/google";

const openSans = Open_Sans({
  weight : ["300" , "400" , "500" , "600" , "700"],
  subsets : ["latin"]
})

interface  pageHeaderProps {
  title : string;
  description : string;
}

const PageHeader = ({
  title ,
  description
} : pageHeaderProps) => {
  return (
    <div className={openSans.className}>
      <h1 className={"text-3xl font-bold tracking-tight mt-4"}>{title}</h1>
      <p className={"text-muted-foreground"}>{description}</p>
    </div>
  )
}

export default PageHeader;