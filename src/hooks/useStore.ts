import { useContext } from "react";
import { context } from "../context";

export const useStore = () =>{
  const store = useContext(context);
  if(!store){
    throw new Error('hooks should used in Page component');
  }
  return store;
}