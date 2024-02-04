import { create } from "zustand"; 

interface useStoreModalTypes {
  isOpen : boolean ;
  onOpen : () => void;
  onClose : () => void ;
}

export const usestoreModal  = create<useStoreModalTypes>((set)=>({
  isOpen : false,
  onOpen : () => set({isOpen : true}),
  onClose : () => set({isOpen : false})
}))