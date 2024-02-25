import {Navbar} from "@/app/_components/Navbar/navbar";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import db from "@/lib/db";
import ChangeStore from "@/app/_components/change-store";
import {ModeToggle} from "@/app/_components/mode-toggle";
import {UserAvatar} from "@/app/_components/user-avatar/avatar";
import MobileSidebar from "@/app/_components/Navbar/mobile-sidebar";
import Logo from "@/components/logo";
import Link from "next/link";

export const MainNav = async () => {
  const session = await auth();
  const user = session?.user

  if (!user) {
    redirect("/login");
  }

  const stores = await db.store.findMany({
    where : {
      userId : user.id
    }
  });

  let userLogo = user.name?.slice(0,2)
  if (!userLogo) {
    userLogo = "CN";
  }

  return (
    <div className={"w-full flex items-center justify-between h-16 border-b-2 px-6"}>
        <Link href={"/"} className={"w-28"}>
          <Logo />
        </Link>

      <div className={"hidden lg:block"}>
        <Navbar/>
      </div>

      <div className={"flex items-center justify-between md:gap-x-3 gap-x-2"}>
        <div className={"hidden md:block"}>
          <ChangeStore items={stores}/>
        </div>

       <div className={"hidden md:flex space-x-2"}>
         <UserAvatar name={userLogo} /></div>

        <div className={"block lg:hidden"}>
          <MobileSidebar />
        </div>
      </div>
    </div>
  )
}