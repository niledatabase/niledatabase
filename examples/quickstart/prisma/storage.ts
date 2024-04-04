// Just a small wrapper around AsyncLocalStorage, this will let me access tenantContext.getStore() from anywhere in my code.

import { AsyncLocalStorage } from "async_hooks";
import { PrismaClient } from "@prisma/client";

export const tenantContext = new AsyncLocalStorage<PrismaClient | undefined>();
