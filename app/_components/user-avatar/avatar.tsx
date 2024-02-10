import { Avatar, AvatarFallback } from "@/components/ui/avatar";
export const UserAvatar = ({name}:{name:string}) => {
  return (
    <Avatar>
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  )
}