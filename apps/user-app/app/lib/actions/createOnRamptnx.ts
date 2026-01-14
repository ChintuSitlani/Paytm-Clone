"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db";

export async function createOnRampTnx(
    amount: Number,
    provider: string
) {
    const session = await getServerSession(authOptions);

    const userId = session?.user?.id;

    if (!userId) {
        return { message: "User not authenticated" };
    }
    if(!amount)
        return { message: "Invalid Amount!"}
    
    try {
        await prisma.onRampTransaction.create({
            data: {
                token: crypto.randomUUID(),
                provider,
                amount: Number(amount),
                startTime: new Date(),
                userId:Number(userId),
                status: "Processing",
            },
        });

        return { message: "On-ramp transaction created successfully" };

    } catch (err) {
        console.error(err);
        return { message: "Error while creating on-ramp transaction" };
    }
}