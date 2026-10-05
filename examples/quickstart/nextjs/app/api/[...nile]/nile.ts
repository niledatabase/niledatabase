import { Nile } from '@niledatabase/server';
import { nextJs } from '@niledatabase/nextjs';
import { connectionConfig } from './connectionConfig';

const nile = await Nile({
  ...connectionConfig(),
  debug: true,
  extensions: [nextJs],
});

export { nile };
