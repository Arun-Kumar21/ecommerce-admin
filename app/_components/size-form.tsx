'use client'
import * as z from 'zod';
import {Size} from "@prisma/client";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

interface SizeFormProps {
  initialData : Size | null ;
}

import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import {useState} from "react";
import axios from "axios";
import {useParams, useRouter} from "next/navigation";
import toast from "react-hot-toast";
import AlertModal from "@/components/modals/alert-modal";
import ImageUpload from "@/app/_components/image-upload";

const formSchema = z.object({
  name : z.string().min(3 ),
  value : z.string().min(1)
})

const SizeForm = ({
  initialData
}:SizeFormProps) => {

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
        await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}` , data);
      } else {
        await axios.post(`/api/${params.storeId}/sizes` , data);
      }

      router.push(`/${params.storeId}/sizes`);
      router.refresh();
      toast.success(initialData ? "Size Updated" : "Size Created")
    } catch (error) {
      console.log("PATCH_SIZE" , error);
      toast.error("Something Want Wrong");
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
                      <Input placeholder="Size Name" {...field}/>
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
                      <Input placeholder="Size Value" {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={loading}>{initialData ? "Update Size" : "Create Size"}</Button>
          </form>
        </Form>
      </div>
  );
};

export default SizeForm;