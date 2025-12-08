import 'server-only';
import { Nile } from '@niledatabase/server';
import { nextJs } from '@niledatabase/nextjs';

const _nile = await Nile({
  debug: true,
  extensions: [nextJs],
});
export const { handlers } = _nile;
export const nile = _nile;
