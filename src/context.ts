import { createContext } from "react";
import { Store } from "./page/renderer/store";

export const context = createContext<Store|null>(null);