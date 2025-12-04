import { handlers } from "./nile";
import { Handlers } from "@niledatabase/nextjs";

export const { POST, GET, DELETE, PUT } = handlers as Handlers;
console.log("handlers", handlers);
