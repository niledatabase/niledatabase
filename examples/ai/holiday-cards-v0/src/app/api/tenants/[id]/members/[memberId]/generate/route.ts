import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { teamMembers } from "@/lib/schema";
import OpenAI from "openai";
import { eq, and } from "drizzle-orm";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string; memberId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const tenantId = (await params).id;
  const memberId = (await params).memberId;
  const member = await db.query.teamMembers.findFirst({
    where: (teamMembers, { eq, and }) =>
      and(eq(teamMembers.id, memberId), eq(teamMembers.tenantId, tenantId)),
  });

  if (!member) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  // Generate holiday wishes
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that generates personalized holiday wishes.",
      },
      {
        role: "user",
        content: `Generate a short, warm holiday wish for ${member.name}. Their description: ${member.description}`,
      },
    ],
  });

  const holidayWishes = completion.choices[0].message.content;

  // Generate image
  const image = await openai.images.generate({
    model: "dall-e-2",
    prompt: `A festive holiday card image for ${member.name}, incorporating elements from: ${member.description}`,
    size: "512x512",
  });

  if (!image.data?.[0]?.url) {
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }

  // Download the image and convert to base64
  try {
    const imageResponse = await fetch(image.data[0].url);
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");
    const imageData = `data:image/png;base64,${base64Image}`;

    // Update member with holiday wishes and image data
    await db
      .update(teamMembers)
      .set({
        holidayWishes,
        imageData: imageData,
      })
      .where(
        and(eq(teamMembers.id, memberId), eq(teamMembers.tenantId, tenantId))
      );

    return NextResponse.json({ holidayWishes, imageUrl: imageData });
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}
