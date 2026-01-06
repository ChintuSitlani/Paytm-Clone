import { Card } from "@repo/ui/card";
export const BalanceCard = ({ amount, locked }: {
    amount: number;
    locked: number;
}) => {
    return (
        <Card title="Balance">
            <div className="space-y-3 text-sm">
                <div className="flex justify-between text-[#475569]">
                    <span>Unlocked balance</span>
                    <span className="text-text">{amount / 100} INR</span>
                </div>

                <div className="flex justify-between text-[#475569]">
                    <span>Total Locked Balance</span>
                    <span className="text-text">{locked / 100} INR</span>
                </div>

                <div className="flex justify-between pt-2 border-t border-[#E2E8F0] font-semibold">
                    <span>Total Balance</span>
                    <span className="text-text">{(locked + amount) / 100} INR</span>
                </div>
            </div>
        </Card>
    );
};
