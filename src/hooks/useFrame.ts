import { useEffect } from "react";
import { useStore } from "./useStore";


export const useFrame = (fn: (delta: number,time:number) => void) => {
  const { taskHandler } = useStore();
  useEffect(() => {
    taskHandler.register(fn);
    return () => taskHandler.unregister(fn);
  }, []);
  return null;
}