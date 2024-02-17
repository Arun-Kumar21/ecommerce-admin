"use client"

import React, {useState} from "react";
import {useParams, useRouter} from "next/navigation";

import {ProductColumnsType} from "@/app/(dashboard)/[storeId]/(routes)/products/components/column";
import toast from "react-hot-toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Clipboard, Edit, MoreHorizontal, Trash} from "lucide-react";
import {Button} from "@/components/ui/button";
import axios from "axios";
import AlertModal from "@/components/modals/alert-modal";


interface  ProductCellActionProps {
  data : ProductColumnsType;
}

export const ProductCellActions : React.FC<ProductCellActionProps> = ({data}) => {
  const router = useRouter();
  const params = useParams();

  const [loading , setLoading]  = useState(false);
  const [open , setOpen] = useState(false);

  const onCopy = (id : string) => {
    navigator.clipboard.writeText(id);
    toast.success("Copy on clipboard");
  }

  const onDelete = async () => {
    try{
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${data.id}`)

      router.push(`/${params.storeId}/products`);
      router.refresh();

      toast.success("Successfully deleted");
    } catch (error) {
      console.log("DELETE_PRODUCT" , error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading}/>
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
          <DropdownMenuItem className={"flex items-center justify-between w-full"} onClick={()=> router.push(`/${params.storeId}/products/${data.id}`)}>
            <p>Edit</p>
            <Edit className={"w-4 h-4"}/>
          </DropdownMenuItem>
          <DropdownMenuItem className={"flex w-full items-center justify-between text-red-500"} onClick={()=>setOpen(true)}>
            <p>Delete</p>
            <Trash className={"w-4 h-4"}/>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}