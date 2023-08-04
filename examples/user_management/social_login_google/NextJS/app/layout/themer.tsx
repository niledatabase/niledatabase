'use client';

import { getInitColorSchemeScript } from '@mui/joy/styles';

export default function Themer() {
  return <>{getInitColorSchemeScript()}</>;
}
