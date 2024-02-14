'use client'
import {Modal} from "@/components/ui/modal";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";

interface LogoutModalProps {
  isOpen : boolean;
  onClose  : () => void;
  onConfirm : () => void;
  loading : boolean;
}

const LogoutModal = ({
                      isOpen ,
                      onClose ,
                      onConfirm ,
                      loading
                    } : LogoutModalProps) => {
  const [isMounted , setIsMounted] = useState(false);

  useEffect(()=>{
    setIsMounted(true);
  },[]);

  if (!isMounted) return null;

  return (
    <Modal
      title={"Logout Confirmation"}
      description={"You will be logged out from your account."}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={"w-full space-x-2 flex items-center justify-end"}>
        <Button variant={"outline"} disabled={loading} onClick={onClose}>
          Cancel
        </Button>
        <Button variant={"destructive"} disabled={loading} onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  )
}

export default LogoutModal;