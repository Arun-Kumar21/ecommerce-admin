'use client'

import { useEffect } from "react";

import { usestoreModal } from "@/hooks/use-store-modal";

const CreateStorePage = () => {
  const isOpen = usestoreModal((state) => state.isOpen);
  const onOpen = usestoreModal((state) => state.onOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <div>Root Page</div>;
};

export default CreateStorePage;
