'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateBooking(formData: FormData) {
    const bookingId = formData.get("bookingId") as string;
    const status = formData.get("status") as string; // "CONTACTED", "SCHEDULED", "REJECTED"

    try {
        await prisma.booking.update({
            where: { id: bookingId },
            data: { status }
        });
        
        revalidatePath("/teacher/dashboard");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to update" };
    }
}