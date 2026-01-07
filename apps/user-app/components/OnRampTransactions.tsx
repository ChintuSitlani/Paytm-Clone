import { Card } from "@repo/ui/card";

type TransactionStatus = "Success" | "Failure" | "Processing";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: TransactionStatus;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center py-8 text-slate-500">
          No recent transactions
        </div>
      </Card>
    );
  }

  const statusColor = (status: TransactionStatus) => {
    switch (status) {
      case "Success":
        return "text-green-600";
      case "Failure":
        return "text-red-600";
      case "Processing":
      default:
        return "text-slate-600";
    }
  };

  return (
    <Card title="Recent Transactions">
      <div className="pt-2 space-y-4">
        {transactions.map((t, idx) => (
          <div
            key={idx}
            className="flex justify-between items-start border-b border-slate-200 pb-3 last:border-b-0"
          >
            {/* Left column */}
            <div>
              <div className="text-sm font-medium text-slate-800">
                Received INR
              </div>
              <div className="text-xs text-slate-500">
                {t.time.toDateString()}
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col items-end">
              <div className="text-sm font-semibold text-slate-900">
                + ₹ {t.amount / 100}
              </div>
              <div className="text-xs">
                <span className="text-slate-500 mr-1">Status:</span>
                <span className={`font-medium ${statusColor(t.status)}`}>
                  {t.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
