'use client'

import * as z from 'zod';
import {Store} from "@prisma/client";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

interface modifyStoreProps {
  initialData : Store ;
}

import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import {useState} from "react";
import axios from "axios";
import {useParams, useRouter} from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  name : z.string().min(3 )
})

const ModifyStore = ({
  initialData
}:modifyStoreProps) => {
  const params = useParams();
  const router = useRouter();

  const [loading , setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver : zodResolver(formSchema),
    defaultValues : initialData
  })

  const onSubmit = async (data : z.infer<typeof formSchema>) => {
    try{
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}` , data);
      router.refresh();
      router.push("/");
      toast.success("Update Store Name")
    } catch (error) {
      console.log("PATCH_STORE" , error);
      toast.error("Something Want Wrong");
    } finally {
      setLoading(false);
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast.success("Successfully deleted store");
    } catch (error) {
      console.log("DELETE_STORE" , error);
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  }

  return(
    <div className={"flex items-center justify-between py-4"}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Store Name" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>Save Change</Button>
          </form>
        </Form>

      <Button variant={"outline"} className={"hover:bg-red-500 hover:text-white"} disabled={loading} onClick={onDelete}>
        <Trash className={"w-4 h-4"}/>
      </Button>
    </div>
  );
};

export default ModifyStore;