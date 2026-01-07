import { Card } from "@repo/ui/card";

export const P2PRecentTransactions = ({
    transactions,
}: {
    transactions: {
        time: Date;
        amount: number;
        fromUser: number;
        toUser: number;
    }[];
}) => {
    if (!transactions.length) {
        return (
            <Card title="Recent P2P Transfers">
                <div className="text-center py-8 text-slate-500">
                    No recent P2P transfers
                </div>
            </Card>
        );
    }

    return (
        <Card title="Recent P2P Transfers">
            <div className="pt-2 space-y-4">
                {transactions.map((t, idx) => (
                    <div
                        key={idx}
                        className="flex justify-between items-start border-b border-slate-200 pb-3 last:border-b-0"
                    >
                        {/* Left column */}
                        <div>
                            <div className="text-sm font-medium text-slate-800">
                                Sent INR
                            </div>
                            <div className="text-xs text-slate-500">
                                {t.time.toDateString()}
                            </div>

                            {/* counterparty info */}
                            <div className="text-xs text-slate-400 mt-1">
                                To User: {t.toUser}
                            </div>
                        </div>

                        {/* Right column */}
                        <div className="flex flex-col items-end">
                            <div className="text-sm font-semibold text-red-600">
                                − ₹ {t.amount / 100}
                            </div>
                            <div className="text-xs text-slate-500">
                                P2P Transfer
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};
