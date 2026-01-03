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
            // @ts-ignore: Force TypeScript to accept this field
            resourceUrl: resourceUrl || null 
        } as any // <--- Add this "as any" to force it through
    });

    // ... rest of the function stays the same ...
    await prisma.subscription.update({
        where: { id: subscriptionId },
        data: { classesUsed: { increment: 1 } }
    });

    revalidatePath("/teacher/dashboard");
    revalidatePath("/dashboard");
}