"use client"

import React, {useState} from "react";
import {useParams, useRouter} from "next/navigation";
import { Store } from "@prisma/client"
import {Check, ChevronsUpDown, Plus, Store as StoreIcon} from "lucide-react";

import {usestoreModal} from "@/hooks/use-store-modal";

import {
  Popover, PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/ui/command";

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
          className={cn("w-[175px] justify-between" , className)}
        >
          <StoreIcon className={"mr-2 h-4 w-4"}/>
          {activeStore?.label}
          <ChevronsUpDown  className={"h-4 w-4 ml-auto shrink-0 opacity-50"}/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={"w-[175px] p-0"}>
        <Command>
          <CommandList>
            <CommandInput placeholder={"Search Store..."}/>
            <CommandEmpty>No Store Found</CommandEmpty>
            <CommandGroup>
              {formattedItems.map((store)=> (
                <CommandItem key={store.value}
                  onSelect={()=>onStoreSelect(store)}
                >
                  <StoreIcon className={"mr-2 w-4 h-4"}/>
                  {store.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      activeStore?.value === store.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={()=>{
                  setOpen(false);
                  storeModel.onOpen();
                }}
              >
                <Plus className={"mr-2 w-5 h-5"}/>
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}