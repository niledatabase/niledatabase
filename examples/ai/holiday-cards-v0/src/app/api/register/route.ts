import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  // Check if user already exists
  const existingUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  }).returning();

  return NextResponse.json({ id: newUser[0].id, name: newUser[0].name, email: newUser[0].email });
}

