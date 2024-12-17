import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string; memberId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const tenantId = (await params).id;
  const memberId = (await params).memberId;

  const member = await db.query.teamMembers.findFirst({
    where: (teamMembers, { eq, and }) => and(
      eq(teamMembers.id, memberId),
      eq(teamMembers.tenantId, tenantId)
    ),
  });

  if (!member || !member.imageData) {
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }

  // Extract base64 data after the data URL prefix
  const base64Data = member.imageData.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');

  // Return the image with proper headers
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000',
    },
  });
}