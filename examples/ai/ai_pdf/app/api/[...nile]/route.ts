import { nile } from '@/lib/NileServer';
import { Handlers } from '@niledatabase/nextjs';

export const { POST, GET, DELETE, PUT } = nile.handlers as Handlers;
