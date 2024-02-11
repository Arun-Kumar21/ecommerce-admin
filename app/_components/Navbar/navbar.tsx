'use client'

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";

export const Navbar = () => {

  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Overview',
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'Billboards',
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: 'Categories',
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: 'Sizes',
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      label: 'Colors',
      active: pathname === `/${params.storeId}/colors`,
    },
    {
      href: `/${params.storeId}/products`,
      label: 'Products',
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: 'Orders',
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`,
    },
  ]

  return (
    <nav className={"flex items-center justify-between "}>
        <div className={"flex justify-between gap-x-4 px-4 items-center"}>
          {routes.map((route) => (
            <div key={route.href}
                 className={cn("p-2 dark:border-sky-200 text-neutral-400 hover:text-black dark:hover:text-white", route.active && "rounded-sm bg-accent text-black dark:text-white")}>
              <Link href={route.href}>
                <p className={""}>{route.label}</p>
              </Link>
            </div>
          ))}
        </div>
    </nav>
  )
}