'use server'

import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function makeUserTeacher(formData: FormData) {
    const email = formData.get("email") as string;

    if (!email) return { success: false, error: "Email is required" };

    try {
        // 1. Find User in Clerk
        const client = await clerkClient();
        const userList = await client.users.getUserList({
            emailAddress: [email],
            limit: 1,
        });

        if (userList.data.length === 0) {
            return { success: false, error: "User not found. Ask them to sign up first!" };
        }

        const user = userList.data[0];
        const fullName = `${user.firstName} ${user.lastName}`;

        // 2. Update Clerk Role to 'teacher'
        await client.users.updateUserMetadata(user.id, {
            publicMetadata: {
                role: "teacher"
            }
        });

        // 3. Create Basic Teacher Profile (With Placeholders)
        await prisma.teacher.upsert({
            where: { email: email },
            update: {
                // If they exist, ensure the name matches Clerk
                name: fullName
            },
            create: {
                id: user.id,
                email: email,
                name: fullName,
                // Default values until they edit their profile
                subject: "Pending Setup", 
                bio: "Profile coming soon.",
                image: user.imageUrl,
                hourlyRate: 0, // Hidden now anyway
                rating: 5.0,
            }
        });

        revalidatePath("/admin");
        revalidatePath("/explore");
        return { success: true };

    } catch (error) {
        console.error("Make Teacher Error:", error);
        return { success: false, error: "Failed to promote user." };
    }
}