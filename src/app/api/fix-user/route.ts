import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Forcefully create or ensure the user exists
    const user = await prisma.user.upsert({
      where: { id: 'user_pravek_123' },
      update: {}, // If he exists, do nothing
      create: {
        id: 'user_pravek_123',
        email: 'student@maestro.com',
        name: 'Pravek',
        role: 'STUDENT'
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "User 'Pravek' restored successfully!", 
      user 
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}