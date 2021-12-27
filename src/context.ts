import { createContext } from "react";
import { Store } from "./page/reactrenderer/store";

export const context = createContext<Store|null>(null);