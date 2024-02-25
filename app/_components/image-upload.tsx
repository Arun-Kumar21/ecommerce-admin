'use client'

import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {ImagePlus, Trash} from "lucide-react";
import Image from "next/image";
import {CldUploadButton, CldUploadWidget} from "next-cloudinary";

interface ImageUploadProps {
  disabled : boolean;
  onChange : (value : string) => void;
  onRemove : (value : string) => void;
  value : string[];
}
const ImageUpload = ({
  disabled ,
  onChange ,
  onRemove ,
  value
} : ImageUploadProps) => {
  const [isMounted  , setIsMounted] = useState(false);

  useEffect(()=>{
    setIsMounted(true);
  },[])


  const onUpload = (result : any) => {
    onChange(result.info.secure_url);
  }

  if (!isMounted) return null;

  return (
    <div>
      <div className={"mb-4 flex items-center gap-4"}>
        {value.map((url)=>(
          <div key={url}>
            <div className={"relative w-[200px] h-[200px] overflow-hidden rounded-md"}>
              <div className={"z-10 absolute top-2 right-2"}>
                <Button variant={"destructive"} onClick={()=>onRemove(url)} size={"sm"}>
                  <Trash className={"w-4 h-4"}/>
                </Button>
              </div>
              <Image src={url} alt={"Image"} fill className={"object-cover"}/>
            </div>
          </div>
        ))}
      </div>

      <CldUploadWidget onUpload={onUpload} uploadPreset="e8eizdbx">
        {({open}) => {
          const onClick = () => {
            open();
          }
          return (
            <Button
              type={"button"}
              disabled={disabled}
              variant={"secondary"}
              onClick={onClick}
              className={"flex items-center justify-between gap-x-3"}
            >
              <ImagePlus className={"h-4 w-4"}/>
              <p>Upload an Image</p>
            </Button>
          )
        }}
      </CldUploadWidget>

    </div>
  )
}

export default ImageUpload;