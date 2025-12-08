import { NextRequest, NextResponse } from 'next/server';

import mailchimp from '@mailchimp/mailchimp_marketing';

const MAILCHIMP_KEY = process.env.MAILCHIMP_KEY;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
const MAILCHIMP_SERVER = process.env.MAILCHIMP_SERVER;

mailchimp.setConfig({
  apiKey: MAILCHIMP_KEY,
  server: MAILCHIMP_SERVER,
});

export async function POST(req: NextRequest) {
  if (
    MAILCHIMP_KEY == null ||
    MAILCHIMP_SERVER == null ||
    MAILCHIMP_LIST_ID == null
  ) {
    return new Response(null, { status: 404 });
  }
  let failed = false;

  const payload = await new Response(req.body).json();

  const { email } = payload;

  await mailchimp.lists
    .addListMember(MAILCHIMP_LIST_ID, {
      email_address: email,
      status: 'subscribed',
    })
    .catch((e: any) => {
      failed = true;
      console.log('[ERROR]', e);
    });

  if (failed) {
    return new Response(null, {
      status: 400,
    });
  }

  return new Response(null, {
    status: 204,
  });
}
