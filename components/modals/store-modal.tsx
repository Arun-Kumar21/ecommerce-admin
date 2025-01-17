'use client'

import  * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Modal } from "@/components/ui/modal"
import { usestoreModal } from "@/hooks/use-store-modal"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

const formSchema = z.object({
  name : z.string().min(1),
})

export const StoreModal = () => {
  const storeModal = usestoreModal();
  const [loading , setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
      resolver : zodResolver(formSchema),
      defaultValues : {
        name : "",
      } 
  })
  const onSubmit = async( value : z.infer<typeof formSchema> ) => {
    try{
        setLoading(true);
        const res = await axios.post("/api/stores" , value);
        toast.success("Successfully Created Store");

        window.location.assign(`/${res.data.id}`);
    } catch (error) {
        console.log("STORE_POST", error);
        toast.error("Internal Server Error")
    } finally {
        setLoading(false);
    }
  }

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories."
      isOpen = {storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className='space-y-4 py-2 pb-4'>
          <div className='space-y-2'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField 
                  control={form.control}
                  name='name'
                  render={({field})=>(
                    <FormItem>
                      <FormLabel>Store Name</FormLabel>
                      <FormControl>
                        <Input placeholder='E-Commerce' {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button variant="outline" onClick={storeModal.onClose} disabled={loading}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading} onClick={storeModal.onClose}>Continue</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  )
}