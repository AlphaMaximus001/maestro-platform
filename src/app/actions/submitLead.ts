'use server'

import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function submitLead(formData: FormData) {
  const { userId } = await auth();
  const user = await currentUser();

  const teacherId = formData.get("teacherId") as string;
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  // Save the lead to the database
  await prisma.booking.create({
    data: {
      teacherId,
      // If user is logged in, use their ID. If not, mark as "guest"
      studentId: userId || "guest", 
      studentName: name,
      studentPhone: phone,
      studentEmail: user?.emailAddresses[0]?.emailAddress || "guest@example.com",
      message: message,
      status: "PENDING_CALL"
    }
  });

  // Refresh the admin dashboard so the new lead shows up immediately
  revalidatePath("/admin");
}