'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBooking(formData: FormData) {
    const teacherId = formData.get("teacherId") as string;
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const type = formData.get("type") as string; // "DEMO" or "CONSULTATION"
    const message = formData.get("message") as string;

    if (!teacherId || !name || !phone) {
        return { success: false, error: "Name and Phone are required." };
    }

    try {
        await prisma.booking.create({
            data: {
                teacherId,
                studentName: name,
                studentPhone: phone,
                type: type,
                message: message,
                status: "PENDING"
            }
        });
        
        // Refresh the admin dashboard so the lead appears immediately
        revalidatePath("/admin");
        
        return { success: true };
    } catch (error) {
        console.error("Booking Error:", error);
        return { success: false, error: "Failed to submit. Please try again." };
    }
}