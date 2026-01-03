'use server'

import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function grantAccess(formData: FormData) {
    const email = formData.get("email") as string;
    const teacherId = formData.get("teacherId") as string;
    const plan = formData.get("plan") as string; // "Beginner", "Intermediate", "Advanced"

    if (!email || !teacherId) return { success: false, error: "Email and Teacher are required" };

    try {
        // 1. Find the Clerk User ID by Email
        // We use the Clerk Backend API to search for the user
        const client = await clerkClient();
        const userList = await client.users.getUserList({
            emailAddress: [email],
            limit: 1,
        });

        if (userList.data.length === 0) {
            return { success: false, error: "User not found. Ask them to sign up first!" };
        }

        const student = userList.data[0];
        const studentId = student.id;
        const studentName = `${student.firstName} ${student.lastName}`;

        // 2. Determine Plan Details
        let totalClasses = 4;
        if (plan === "Intermediate") totalClasses = 8;
        if (plan === "Advanced") totalClasses = 12;

        // 3. Create the Subscription
        await prisma.subscription.create({
            data: {
                studentId,
                studentName: studentName || "Student",
                teacherId,
                totalClasses,
                classesUsed: 0,
                status: "ACTIVE",
            }
        });

        revalidatePath("/admin");
        return { success: true };

    } catch (error) {
        console.error("Grant Access Error:", error);
        return { success: false, error: "Failed to grant access." };
    }
}