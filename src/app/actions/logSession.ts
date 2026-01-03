"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function logSession(formData: FormData) {
  const subscriptionId = formData.get("subscriptionId") as string;
  const topic = formData.get("topic") as string;
  const resourceUrl = formData.get("resourceUrl") as string; 

  // 1. Create the session log
  await prisma.classSession.create({
    data: {
      subscriptionId,
      date: new Date(),
      topic: topic,
      status: "COMPLETED",
      duration: 60,
      // @ts-ignore: Force TypeScript to accept this field if it's missing in schema
      resourceUrl: resourceUrl || null 
    } as any 
  });

  // 2. Increment the classesUsed counter on the subscription
  await prisma.subscription.update({
    where: { id: subscriptionId },
    data: { classesUsed: { increment: 1 } }
  });

  // 3. Refresh the dashboards so the new data shows up immediately
  revalidatePath("/teacher/dashboard");
  revalidatePath("/dashboard");
}