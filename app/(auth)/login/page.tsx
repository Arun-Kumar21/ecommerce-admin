"use client";
import React, { useTransition } from "react";

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
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import toast from "react-hot-toast";
import { login } from "@/actions/login";


const LoginForm = () => {
  const [isPending , startTransition] = useTransition();

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
                    <Input type="password" {...field} placeholder="*********" />
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
