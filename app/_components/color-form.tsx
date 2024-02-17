'use client'
import * as z from 'zod';
import {Color} from "@prisma/client";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

interface ColorFormProps {
  initialData : Color | null ;
}

import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import axios from "axios";
import {useParams, useRouter} from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  name : z.string().min(3 ),
  value : z.string().min(1)
})

const ColorForm = ({
  initialData
}:ColorFormProps) => {

  const params = useParams();
  const router = useRouter();

  const [loading , setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver : zodResolver(formSchema),
    defaultValues : initialData || {
      name : "" ,
      value : ""
    }
  })

  const onSubmit = async (data : z.infer<typeof formSchema>) => {
    try{
      setLoading(true);

      if (initialData) {
        await axios.patch(`/api/${params.storeId}/colors/${params.colorId}` , data);
      } else {
        await axios.post(`/api/${params.storeId}/colors` , data);
      }

      router.push(`/${params.storeId}/colors`);
      router.refresh();
      toast.success(initialData ? "Color Updated" : "Color Created")
    } catch (error) {
      console.log("PATCH_COLOR" , error);
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  }

  return(
    <div className={"flex items-center justify-between py-4"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
          <div className={"md:flex items-center justify-between  gap-x-6 w-1/2 md:w-full"}>
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Color Name" {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className={"flex items-center gap-x-3"}>
                      <Input placeholder="Color Value" {...field}/>
                      <div
                        className={"border p-4 rounded-full"}
                        style = {{backgroundColor : field.value}}
                      ></div>
                    </div>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading}>{initialData ? "Update Color" : "Add Color"}</Button>
        </form>
      </Form>
    </div>
  );
};

export default ColorForm;