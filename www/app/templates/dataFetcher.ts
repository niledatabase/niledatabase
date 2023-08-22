import * as templates from "./templates";
import { Template } from "./types";
export default function loadTemplates(): Template[] {
  return Object.values(templates);
}
