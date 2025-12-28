import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  // 1. Clean the database (Delete in order to avoid foreign key errors)
  await prisma.booking.deleteMany();
  await prisma.review.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create the Student User (CRITICAL FOR BOOKING)
  await prisma.user.create({
    data: {
      id: "user_pravek_123", // Matches the hardcoded ID in BookingCard
      email: "student@maestro.com",
      name: "Pravek",
      role: "STUDENT"
    }
  });

  // 3. Create Teachers
  await prisma.teacher.createMany({
    data: [
      {
        name: "Sarah Jenkins",
        subject: "Coding",
        hourlyRate: 800,
        dailyRate: 4800,
        monthlyRate: 16000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
        bio: "Ex-Google engineer with 8 years of experience in Python and React."
      },
      {
        name: "David Chen",
        subject: "Piano",
        hourlyRate: 1200,
        dailyRate: 7200,
        monthlyRate: 24000,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
        bio: "Concert pianist and graduate of the Royal Academy of Music."
      },
      {
        name: "Marcus Johnson",
        subject: "Photography",
        hourlyRate: 950,
        dailyRate: 5700,
        monthlyRate: 19000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
        bio: "Award-winning street photographer."
      }
    ]
  });

  return NextResponse.json({ message: "Database seeded: User 'Pravek' and Teachers created!" });
}