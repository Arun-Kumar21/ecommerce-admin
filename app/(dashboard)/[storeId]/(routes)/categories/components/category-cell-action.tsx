"use client"

import React from "react";
import {useParams, useRouter} from "next/navigation";

import toast from "react-hot-toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Clipboard , Edit, MoreHorizontal} from "lucide-react";
import {Button} from "@/components/ui/button";
import {CategoryColumnsType} from "@/app/(dashboard)/[storeId]/(routes)/categories/components/column";


interface  CategoryCellActionProps {
  data : CategoryColumnsType;
}

export const CategoryCellAction : React.FC<CategoryCellActionProps> = ({data}) => {
  const router = useRouter();
  const params = useParams();

  const onCopy = (id : string) => {
    navigator.clipboard.writeText(id);
    toast.success("Copy on clipboard");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={"flex w-full items-center justify-between"} onClick={()=>onCopy(data.id)}>
          <p>Copy Id</p>
          <Clipboard className={"w-4 h-4"}/>
        </DropdownMenuItem>
        <DropdownMenuItem className={"flex items-center justify-between w-full"} onClick={()=> router.push(`/${params.storeId}/categories/${data.id}`)}>
          <p>Edit</p>
          <Edit className={"w-4 h-4"}/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}