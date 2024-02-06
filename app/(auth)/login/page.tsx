"use client";
import React from "react";

import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schema";

import { useToast } from "@/components/ui/use-toast";
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
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import axios from "axios";

import { signIn } from "next-auth/react";

const LoginForm = () => {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);

    signIn("credentials" , {
      ...data , 
      redirect: false,
    })
    .then((res)=>{
      if (res?.error) {
        toast({
          title: "Invalid Credentials",
          description: "Invalid email or password",
          duration: 3000,
        })
      }

      if (res?.ok) {
        toast({
          title: "Login Successful",
          description: "You have been logged in",
          duration: 3000,
        })
      }
    })
    .catch((error)=>{
      console.error("LOGIN_POST", error);
    })
    .finally(()=>{
      setIsLoading(false);
    })

    /* 
    try {
      setIsLoading(true);
      const res = await axios.post("/api/login", data);

      if (res.status === 200) {
        toast({
          title: "Login Successful",
          description: "You have been logged in",
          duration: 3000,
        })
        console.log(res.data);
      }

      if (res.status === 400) {
        toast({
          title: "Invalid Credentials",
          description: "Invalid email or password",
          duration: 3000,
        });
      } 

    } catch (error) {
      console.error("LOGIN_POST", error);
    } finally {
      setIsLoading(false);
    } 
    */
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
                    <Input type="password" {...field} placeholder="*********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message="" />
          <FormSuccess message="" />
          <Button type="submit" className="w-full" disabled={isLoading}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
