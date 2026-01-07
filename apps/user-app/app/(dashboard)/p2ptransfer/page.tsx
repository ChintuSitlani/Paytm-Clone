import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { SendMoneyCard } from "../../../components/SendMoneyCard";



export default async function() {

    return <div className="w-screen">
        <div className="text-4xl text-[#00B9F1] pt-8 mb-8 font-bold">
            P2PTransfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <SendMoneyCard />
            </div>
        </div>
    </div>
}