import { Instance } from "../../types";
import { Parameters } from "./prop";

export interface Generator {
  generate: (data:Set<Parameters> | Set<Instance>) => string;
}