'use client'
import * as z from 'zod';
import {Category, Color, Image, Product, Size} from "@prisma/client";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

interface ProductFormProps {
  initialData : Product & {
    images : Image[]
    } | null ;
  categories : Category[],
  colors : Color[],
  sizes : Size[]
}

import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import axios from "axios";
import {useParams, useRouter} from "next/navigation";
import toast from "react-hot-toast";
import ImageUpload from "@/app/_components/image-upload";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Checkbox} from "@/components/ui/checkbox";

const formSchema = z.object({
  name : z.string().min(3 ),
  images : z.object({url : z.string().min(1)}).array(),
  price : z.coerce.number().min(1),
  categoryId : z.string().min(1),
  colorId : z.string().min(1),
  sizeId : z.string().min(1),
  isArchived : z.boolean().default(false).optional(),
  isFeatured : z.boolean().default(false).optional(),
})

const ProductForm = ({
  initialData,
  categories,
  sizes,
  colors,

}:ProductFormProps) => {

  const params = useParams();
  const router = useRouter();

  const [loading , setLoading] = useState(false);
  const [open , setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver : zodResolver(formSchema),
    defaultValues : initialData || {
      name : "" ,
      images : [] ,
      price : 0 ,
      categoryId : '',
      colorId : '',
      sizeId : '',
      isFeatured : false,
      isArchived : false,
    }
  })

  const onSubmit = async (data : z.infer<typeof formSchema>) => {
    try{
      setLoading(true);

      if (initialData) {
        await axios.patch(`/api/${params.storeId}/products/${params.productId}` , data);
      } else {
        await axios.post(`/api/${params.storeId}/products` , data);
      }

      router.push(`/${params.storeId}/products`);
      router.refresh();
      toast.success(initialData ? "Product Updated" : "Product Added")
    } catch (error) {
      console.log("PATCH_PRODUCT" , error);
      toast.error("Something Want Wrong");
    } finally {
      setLoading(false);
    }
  }


  return(
    <div className={"flex items-center justify-between py-4"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
          {!initialData &&  <FormField
            control={form.control}
            name="images"
            render={({field}) => (
              <FormItem>
                <FormLabel>Product Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) => field.onChange([...field.value, {url}])}
                    onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />}

          <div className="md:grid md:grid-cols-3 gap-8">

            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product name" {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Product Price" {...field} type={"number"}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value}
                            defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} placeholder={"Select a Category"}/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem value={category.id} key={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="colorId"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value}
                            defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} placeholder={"Select a color"}/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {colors.map((color) => (
                          <SelectItem value={color.id} key={color.id}>
                            {color.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sizeId"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value}
                            defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} placeholder={"Select a size"}/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sizes.map((size) => (
                          <SelectItem value={size.id} key={size.id}>
                            {size.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isFeatured"
              render={({field}) => (
                <FormItem className={"flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4"}>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className={"space-y-1 leading-none"}>
                    <FormLabel>
                      Feature
                    </FormLabel>
                    <FormDescription>
                      This product will appear on home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isArchived"
              render={({field}) => (
                <FormItem className={"flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4"}>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className={"space-y-1 leading-none"}>
                    <FormLabel>
                      Archived
                    </FormLabel>
                    <FormDescription>
                      This product will archived
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

          </div>
            <Button type="submit" disabled={loading}>{initialData ? "Update Product" : "Add Product"}</Button>
        </form>
      </Form>
    </div>
)};

export default ProductForm;