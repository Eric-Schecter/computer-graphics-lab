import { Instance } from "../../types";

export interface Generator {
  generate: (data:Set<Instance>) => string;
}