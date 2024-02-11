import {Navbar} from "@/app/_components/Navbar/navbar";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import db from "@/lib/db";
import ChangeStore from "@/app/_components/change-store";
import {ModeToggle} from "@/app/_components/mode-toggle";
import {UserAvatar} from "@/app/_components/user-avatar/avatar";

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
      <div className={"LOGO"}>LOGO</div>
      <Navbar/>

      <div className={"flex items-center justify-between gap-x-3"}>
        <ChangeStore items={stores}/>
        <ModeToggle />
        <UserAvatar name={userLogo} />
      </div>
    </div>
  )
}