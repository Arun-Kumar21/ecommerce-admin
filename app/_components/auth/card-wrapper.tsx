"use client"

import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader,
 } from "@/components/ui/card";
import { Header } from "./header";
import { BackButton } from "./back-button";
import {useEffect, useState} from "react";

interface CardWrapperProps {
  children: React.ReactNode;
  title: string;
  backButtonLabel : string;
  backButtonHref : string;
}

export const CardWrapper  = ({
  children,
  title,
  backButtonLabel,
  backButtonHref
}:CardWrapperProps) => {
  const [isMounted , setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true)
  }, []);

  if (!isMounted) return null;

  return (
    <Card className="w-[350px] shadow-md">
      <CardHeader>
        <Header label={title} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  )
}