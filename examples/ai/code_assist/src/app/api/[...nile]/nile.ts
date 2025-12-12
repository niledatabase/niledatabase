import { nextJs } from '@niledatabase/nextjs';
import { Nile } from '@niledatabase/server';

export const nile = Nile({
  debug: true,
  extensions: [nextJs],
});

export const { handlers } = nile;
