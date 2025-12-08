import { Nile } from '@niledatabase/server';
import { nextJs } from '@niledatabase/nextjs';

export const nile = await Nile({
  debug: true,
  extensions: [nextJs],
});
