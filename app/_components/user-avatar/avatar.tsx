'use client'

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LogoutModal from "@/components/modals/Logout-modal";
import {useSession} from "next-auth/react";
import {redirect, useRouter} from "next/navigation";
import {useState} from "react";
import {LogOut} from "lucide-react";
import LogoutAction from "@/actions/logout";
import toast from "react-hot-toast";

export const UserAvatar = ({name}:{name:string}) => {
  const session = useSession();
  const user = session.data?.user

  const router = useRouter();

  if (!user) redirect("/login");

  const [open , setOpen] = useState(false);
  const [loading , setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await LogoutAction();
      toast.success("Successfully logout");
      router.refresh();
      router.push("/login")

    } catch (error) {
      console.log("Logout_Error" , error);
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <LogoutModal isOpen={open} onClose={()=>setOpen(false)} onConfirm={handleLogout} loading={loading}/>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarFallback>
              <p className={"uppercase"}>{name}</p>
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{user.name}</DropdownMenuItem>
          <DropdownMenuItem>{user.email}</DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button className={"flex items-center justify-between w-full text-red-500"} onClick={()=> setOpen(true)}>
              <p>Logout</p>
              <LogOut className={"w-4 h-4"}/>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}