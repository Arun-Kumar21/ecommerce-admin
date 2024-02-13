import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {LogOut} from "lucide-react";
import {auth} from "@/auth";
import {redirect} from "next/navigation";

export const UserAvatar = async ({name}:{name:string}) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/");
  }

  // TODO : ADD LOGOUT FUNCTIONALITY

  return (
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
          <button className={"text-red-500 flex items-center justify-between w-full"} type={"submit"}>
            <p>Logout</p>
            <LogOut className={"w-4 h-4"}/>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}