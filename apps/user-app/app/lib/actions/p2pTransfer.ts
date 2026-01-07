"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";


export async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const fromUserId = Number(session?.user?.id);
    try {
        if (!fromUserId) {
            return { message: "User not authenticated" };
        }
        if (!amount || amount <= 0)
            return { message: "Invalid Amount!" }

        const toUser = await prisma.user.findFirst({
            where: {
                number: to
            }
        })

        if (!toUser)
            return { message: "User for " + to + " no. not found!" }

        if (fromUserId === toUser.id) {
            throw new Error("Cannot transfer to self");
          }
          
        await prisma.$transaction(async (tx) => {

            await tx.$queryRaw`SELECT 1 From "Balance"  WHERE "userId" =  ${fromUserId} FOR UPDATE`;//for locking the balance table row 

            const fromBalance = await tx.balance.findUnique({
                where: {
                    userId: fromUserId
                }
            });

            if (!fromBalance || fromBalance?.amount < amount)
                throw new Error("insuficient balance!");
            //inceaseing amount for receiver
            await tx.balance.update({
                where: {
                    userId: toUser.id
                },
                data: {
                    amount: {
                        increment: amount
                    }
                }
            });
            //deducting amount from sender
            await tx.balance.update({
                where: {
                    userId: fromUserId
                },
                data: {
                    amount: {
                        decrement: amount
                    }
                }
            });
        })

        return {message:"Transaction Succesfull."}
    } catch (err) {
        console.error("Something went wrong "+err);
        return ({
            message: "Something went wrong",
        });
    }
}