'use client';
import Link from "next/link";
import {useParams, usePathname} from "next/navigation";
import { LayoutDashboard } from 'lucide-react';
import {cn} from "@/lib/utils";

export const Sidebar = () => {
  const pathname = usePathname();
  const params = useParams();

  console.log(pathname);

  const routes = [
    {
      href : `/${params.storeId}`,
      label : "Dashboard",
      active : pathname === `/${params.storeId}` ,
      icon : <LayoutDashboard size={18} className={"text-sky-400"}/>
    },

  ]

  return(
    <div className={"w-56 bg-white dark:bg-neutral-950 h-full fixed top-0 left-0 border-r-2"}>
      <div className={"w-full h-16 flex items-center justify-center"}>
        LOGO
      </div>

      <div className={"h-full w-full px-4 py-2 flex items-center justify-between flex-col"}>
        {routes.map((route)=>(
          <div key={route.href} className={cn("w-full p-4 rounded-md" , route.active ? "bg-neutral-100 dark:bg-neutral-900 " : "")}>
            <Link href={route.href} className={"flex items-center gap-x-2"}>
              {route.icon}
              <p>{route.label}</p>
            </Link>
          </div>
        ))}
      </div>

    </div>
  )
}