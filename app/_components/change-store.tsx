import React, {useState} from "react";
import {useParams, useRouter} from "next/navigation";
import { Store } from "@prisma/client"
import {ChevronsUpDown, Store as StoreIcon} from "lucide-react";

import {usestoreModal} from "@/hooks/use-store-modal";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

type PopoverTriggerProps = React.ComponentPropsWithRef<typeof  PopoverTrigger>
interface ChangeStoreProps extends PopoverTriggerProps{
  items : Store[];
}


export default function ChangeStore ({
  className ,
  items = []
}:ChangeStoreProps) {

  const storeModel  = usestoreModal();
  const params = useParams();
  const router = useRouter();

  const [open , setOpen] = useState(false);

  const formattedItems = items.map((item)=>({
    label : item.name ,
    value : item.id
  }));

  const activeStore = formattedItems.find((item)=> item.value === params.storeId);

  const onStoreSelect = (store : {value : string , label : string}) => {
    setOpen(false);
    router.push(`/${store.value}`);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} size={"sm"} role={"combobox"} aria-expanded={open} aria-label={"Select a Store"}
          className={cn("w-[200px] justify-between" , className)}
        >
          <StoreIcon className={"mr-2 h-4 w-4"}/>
            Current Store
          <ChevronsUpDown  className={"ml-auto h-4 w-4 shrink-0 opacity-50"}/>
        </Button>
      </PopoverTrigger>
    </Popover>
  )
}