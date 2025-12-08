import { NextRequest, NextResponse } from 'next/server';
import { Logger } from '../utils';

const { error } = Logger('/api/feedback');

export async function POST(req: NextRequest) {
  const body = await new Response(req.body).json();

  const blocks = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: 'Website Contact Form',
      },
    },
    {
      accessory: {
        type: 'image',
        image_url:
          'https://cdn.vox-cdn.com/thumbor/E_teMuAIOQycEi3ZAnHR4xd77hg=/0x0:2202x1228/920x613/filters:focal(925x438:1277x790):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/59025985/Screen_Shot_2017_08_29_at_4.27.44_PM.0.png',
        alt_text: 'take my money',
      },
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: '*email*',
        },
        {
          type: 'plain_text',
          text: body?.email,
        },
      ],
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: '*message*',
        },
        {
          type: 'plain_text',
          text: body?.message,
        },
      ],
    },
  ];
  if (process.env.CONTACT_US) {
    const resp = await fetch(process.env.CONTACT_US, {
      method: 'POST',
      body: JSON.stringify({ blocks }),
    }).catch((e) => {
      error(e.message);
    });

    return NextResponse.json(null, { status: resp?.status });
  }
  return NextResponse.json({ error: 'Missing env vars' }, { status: 500 });
}
