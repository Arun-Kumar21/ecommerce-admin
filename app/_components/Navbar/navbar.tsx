'use client'

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {
  ArrowLeftRight,
  Component,
  LayoutDashboard,
  MonitorCheck,
  Package,
  Palette,
  Ruler,
  Settings
} from "lucide-react";

export const Navbar = () => {

  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Overview',
      active: pathname === `/${params.storeId}`,
      icon : <LayoutDashboard className={"w-6 h-6 text-cyan-500"}/>
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'Billboards',
      active: pathname === `/${params.storeId}/billboards`,
      icon : <MonitorCheck className={"w-6 h-6 text-pink-500"}/>
    },
    {
      href: `/${params.storeId}/categories`,
      label: 'Categories',
      active: pathname === `/${params.storeId}/categories`,
      icon : <Component className={"w-6 h-6 text-purple-500"}/>
    },
    {
      href: `/${params.storeId}/sizes`,
      label: 'Sizes',
      active: pathname === `/${params.storeId}/sizes`,
      icon : <Ruler className={"w-6 h-6 text-yellow-500"}/>
    },
    {
      href: `/${params.storeId}/colors`,
      label: 'Colors',
      active: pathname === `/${params.storeId}/colors`,
      icon : <Palette className={"w-6 h-6 text-emerald-500"}/>
    },
    {
      href: `/${params.storeId}/products`,
      label: 'Products',
      active: pathname === `/${params.storeId}/products`,
      icon : <Package className={"w-6 h-6 text-red-700"}/>
    },
    {
      href: `/${params.storeId}/orders`,
      label: 'Orders',
      active: pathname === `/${params.storeId}/orders`,
      icon : <ArrowLeftRight className={"w-6 h-6 text-fuchsia-500"}/>
    },
    // {
    //   href: `/${params.storeId}/settings`,
    //   label: 'Settings',
    //   active: pathname === `/${params.storeId}/settings`,
    //   icon : <Settings className={"w-6 h-6 text-neutral-700"}/>
    // },
  ]

  return (
    <nav className={"mt-3 lg:mt-0 flex items-center justify-between h-full py-2 lg:py-0"}>
        <div className={"flex flex-col lg:flex-row justify-between gap-x-4 px-4 items-center w-full gap-y-3"}>
          {routes.map((route) => (
            <div key={route.href}
                 className={cn("p-2 dark:border-sky-200 text-neutral-400 hover:text-black dark:hover:text-white w-full", route.active && "rounded-sm bg-accent text-black dark:text-white")}>
              <Link href={route.href} className={"flex items-center justify-between w-full px-2 lg:px-0"}>
                <div className={"block lg:hidden"}>
                  {route.icon}
                </div>
                <p>{route.label}</p>
              </Link>
            </div>
          ))}
        </div>
    </nav>
  )
}