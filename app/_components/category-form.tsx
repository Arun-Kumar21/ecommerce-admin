'use client'
import * as z from 'zod';
import {Billboard, Category} from "@prisma/client";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

interface CategoryFormProps {
  initialData : Category | null ;
  billboards : Billboard[]
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
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import AlertModal from "@/components/modals/alert-modal";
import {Trash} from "lucide-react";
import {Separator} from "@/components/ui/separator";

const formSchema = z.object({
  name : z.string().min(3 ),
  billboardId : z.string().min(1),
})

const CategoryForm = ({
  initialData,
  billboards
}:CategoryFormProps) => {

  const params = useParams();
  const router = useRouter();

  const [loading , setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver : zodResolver(formSchema),
    defaultValues : initialData || {
      name : "",
      billboardId: ""
    }
  })

  const onSubmit = async (data : z.infer<typeof formSchema>) => {
    try{
      setLoading(true);

      if (initialData) {
        await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}` , data);
      } else {
        await axios.post(`/api/${params.storeId}/categories` , data);
      }

      router.push(`/${params.storeId}/categories`);
      router.refresh();
      toast.success(initialData ? "Category Updated" : "Category Created")
    } catch (error) {
      console.log("PATCH_STORE" , error);
      toast.error("Something Want Wrong");
    } finally {
      setLoading(false);
    }
  }

  return(
      <div className={"py-4"}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4 md:w-1/2 my-3"}>
            <div className={"flex items-center justify-between"}>
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Category name" {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="billboardId"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Billboard</FormLabel>
                    <FormControl>
                      <Select disabled={loading} onValueChange={field.onChange} value={field.value}
                              defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue defaultValue={field.value} placeholder={"Select a Billboard"}/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {billboards.map((billboard) => (
                            <SelectItem value={billboard.id} key={billboard.id}>
                              {billboard.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
           <Button type="submit" disabled={loading}>{initialData ? "Update Category" : "Create Category"}</Button>
          </form>
        </Form>
      </div>
  );
};

export default CategoryForm;