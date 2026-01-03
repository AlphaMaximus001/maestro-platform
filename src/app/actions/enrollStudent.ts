'use server'

import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function enrollStudent(formData: FormData) {
    const { userId } = await auth();
    const user = await currentUser(); // Get full user details for the name
    
    if (!userId || !user) {
        redirect('/sign-in');
    }

    const teacherId = formData.get("teacherId") as string;
    const plan = formData.get("plan") as string;

    // Determine classes based on plan
    let totalClasses = 4;
    if (plan === "Intermediate") totalClasses = 8;
    if (plan === "Advanced") totalClasses = 12;

    const studentName = `${user.firstName} ${user.lastName}`;

    // Create Subscription
    await prisma.subscription.create({
        data: {
            studentId: userId,
            studentName: studentName,
            teacherId: teacherId,
            totalClasses: totalClasses,
            classesUsed: 0,
            status: "ACTIVE",
        }
    });

    // Refresh Dashboard and Redirect
    revalidatePath("/dashboard");
    redirect("/dashboard");
}