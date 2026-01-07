import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { SendMoneyCard } from "../../../components/SendMoneyCard";
import { P2PRecentTransactions } from "../../../components/P2PRecentTransactions";

async function getRecentP2PTransfer() {
    const session = await getServerSession(authOptions);
    const userId = await Number(session?.user?.id);

    const p2pTransfer = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: userId,
        },
        orderBy: {
            timestamp: "desc"
        }
    });
    return p2pTransfer.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        fromUser: t.fromUserId,
        toUser: t.toUserId
    }));
}


export default async function () {
    const transactions = await getRecentP2PTransfer();

    return <div className="w-screen">
        <div className="text-4xl text-[#00B9F1] pt-8 mb-8 font-bold">
            P2PTransfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <SendMoneyCard />
            </div>
            <div className="pt-4">
                <P2PRecentTransactions transactions={transactions} />
            </div>
        </div>
    </div>
}