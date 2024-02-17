'use client'
import * as z from 'zod';
import {Billboard} from "@prisma/client";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

interface BillboardFormProps {
  initialData : Billboard | null ;
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
  label : z.string().min(3 ),
  imageUrl : z.string().min(1)
})

const BillboardForm = ({
  initialData
}:BillboardFormProps) => {

  const params = useParams();
  const router = useRouter();

  const [loading , setLoading] = useState(false);
  const [open , setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver : zodResolver(formSchema),
    defaultValues : initialData || {
      label : "" ,
      imageUrl : ""
    }
  })

  const onSubmit = async (data : z.infer<typeof formSchema>) => {
    try{
      setLoading(true);

      if (initialData) {
        await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}` , data);
      } else {
        await axios.post(`/api/${params.storeId}/billboards` , data);
      }

      router.push(`/${params.storeId}/billboards`);
      router.refresh();
      toast.success(initialData ? "Billboard Updated" : "Billboard Created")
    } catch (error) {
      console.log("PATCH_STORE" , error);
      toast.error("Something Want Wrong");
    } finally {
      setLoading(false);
    }
  }


  return(
    <>

      <div className={"flex items-center justify-between py-4"}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
            <FormField
              control={form.control}
              name="imageUrl"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Billboard Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      disabled={loading}
                      onChange={(url) => field.onChange(url)}
                      onRemove={(url) => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="label"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input placeholder="Billboard label" {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          <div className={"flex items-center gap-x-4"}>
            <Button type="submit" disabled={loading}>{initialData ? "Update Billboard" : "Create Billboard"}</Button>
            {initialData && (
              <Button
                disabled={loading}
                variant="destructive"
                size="sm"
                onClick={() => setOpen(true)}
              >
                Delete Billboard
              </Button>
            )}
          </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default BillboardForm;