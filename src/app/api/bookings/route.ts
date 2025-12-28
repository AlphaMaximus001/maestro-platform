import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📥 Received Booking Request:", body); // DEBUG LOG 1

    const { studentId, teacherId, date, type } = body;

    // 1. Validate Teacher ID
    const teacher = await prisma.teacher.findUnique({ where: { id: teacherId } });
    if (!teacher) {
        console.error("❌ Teacher not found for ID:", teacherId);
        return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
    }

    // 2. Validate Student ID
    const student = await prisma.user.findUnique({ where: { id: studentId } });
    if (!student) {
        console.error("❌ Student not found for ID:", studentId);
        return NextResponse.json({ error: 'Student not found. Run the seed script!' }, { status: 404 });
    }

    // 3. Calculate Price
    let finalPrice = teacher.hourlyRate;
    let duration = 1;

    if (type === 'daily') {
      finalPrice = teacher.dailyRate || teacher.hourlyRate * 6;
      duration = 8;
    } else if (type === 'monthly') {
      finalPrice = teacher.monthlyRate || teacher.hourlyRate * 20;
      duration = 20; 
    } else {
        finalPrice = teacher.hourlyRate * 2;
        duration = 2;
    }

    console.log(`💰 creating booking: ${type} @ ${finalPrice}`); // DEBUG LOG 2

    // 4. Create Booking
    const booking = await prisma.booking.create({
      data: {
        studentId,
        teacherId,
        date: new Date(date),
        durationHrs: duration,
        totalPrice: finalPrice,
        status: 'CONFIRMED'
      },
    });

    console.log("✅ Booking Success:", booking.id);
    return NextResponse.json({ success: true, booking });

  } catch (error: any) {
    // PRINT THE REAL DATABASE ERROR
    console.error("🔥 CRITICAL DB ERROR:", error.message); 
    return NextResponse.json({ error: 'Booking Failed: ' + error.message }, { status: 500 });
  }
}