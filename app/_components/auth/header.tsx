import { cn } from "@/lib/utils";
import Logo from "@/components/logo";

interface HeaderProps {
  label: string;
}

export const Header = ({
  label
}:HeaderProps)=> {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-28">
        <Logo />
      </div>
      <p className="text-muted-foreground text-sm">
        {label}
      </p>
    </div>
  )
}