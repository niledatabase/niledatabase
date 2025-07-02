import { Handlers } from "@niledatabase/nextjs";
import { nile } from "./nile";

export const { POST, GET, DELETE, PUT } = nile.handlers as Handlers;
