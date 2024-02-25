"use client";
import React, {useEffect, useState, useTransition} from "react";

import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CardWrapper } from "@/app/_components/auth/card-wrapper";
import toast from "react-hot-toast";
import { login } from "@/actions/login";
import {redirect, useRouter} from "next/navigation";
import {Eye, EyeOff} from "lucide-react";



const LoginForm = () => {
  const [isPending , startTransition] = useTransition();
  const [showPassword , setShowPassword] = useState("password");

  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    startTransition(()=>{
      login(data).
      then((req) => {
        if (req?.error) {
          toast.error(req.error);
        } 
        if (req.success) {
          toast.success(req.success);
          router.push("/");
        }
      })
    })
  };

  return (
    <CardWrapper
      title="Login Page"
      backButtonLabel="Don't have an account? Register here."
      backButtonHref="/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      id="email"
                      {...field}
                      placeholder="Enter your email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Password</FormLabel>
                  <FormControl>
                    <form className={"flex items-center justify-between w-full gap-x-4" }>
                      <Input type={showPassword} {...field} placeholder="*********" />
                      {showPassword === "password" ?  <Eye className={"w-6 h-6"} onClick={() => setShowPassword("text")}/> : <EyeOff className={"w-6 h-6"} onClick={()=>setShowPassword("password")}/>}
                    </form>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
