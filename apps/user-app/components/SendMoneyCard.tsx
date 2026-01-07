"use client";

import { useState, useTransition } from "react";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export const SendMoneyCard = () => {
    const [amount, setAmount] = useState(0);
    const [isPending, startTransition] = useTransition();
    const [number, setNumber] = useState('');
    const handleSendMoney = () => {
        startTransition(async () => {
            const msg = await p2pTransfer(number, amount * 100);
            alert(JSON.stringify(msg));
        });
    };

    return (
        <Card title="Add Money">
            <div className="space-y-5">
                <div className="mt-2">
                    <TextInput
                        label="Number"
                        placeholder="Number"
                        onChange={(value) => setNumber(value)}
                    />
                </div>
                <TextInput
                    label="Amount"
                    placeholder="Amount"
                    onChange={(value) => setAmount(Number(value))}
                />


                <div className="flex justify-center pt-4">
                    <Button disabled={isPending} onClick={handleSendMoney}>
                        {isPending ? "Processing..." : "Send Money"}
                    </Button>
                </div>
            </div>
        </Card>
    );
};
