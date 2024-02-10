'use client'

import {UserAvatar} from "@/app/_components/user-avatar/avatar";
import {ModeToggle} from "@/app/_components/mode-toggle";
import ChangeStore from "@/app/_components/change-store";

export const Navbar = () => {

  // TODO : ADD ALL STORES THAT USER HAVE IN BACKEND

  return (
    <nav className={"w-[calc(100vw-14rem)] h-16 bg-white md:ml-56 p-2 flex items-center justify-between border-b-2 px-6 dark:bg-black"}>
        <div className={"flex items-center gap-x-6"}>
          <h1 className={"text-xl font-bold"}>Dashboard</h1>
          <div className={""}>

          </div>
      </div>

      <div className={"cursor-pointer flex items-center gap-x-4"}>
        <ModeToggle />
        <UserAvatar name={"AK"} />
      </div>
    </nav>
  )
}