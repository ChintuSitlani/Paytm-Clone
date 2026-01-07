"use client";

import { useState, useTransition } from "react";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textinput";
import { createOnRampTnx } from "../app/lib/actions/createOnRamptnx";

const SUPPORTED_BANKS = [
    {
        name: "HDFC Bank",
        redirectUrl: "https://netbanking.hdfcbank.com",
    },
    {
        name: "Axis Bank",
        redirectUrl: "https://www.axisbank.com/",
    },
];

export const AddMoney = () => {
    const [amount, setAmount] = useState(0);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name);
    const [redirectUrl, setRedirectUrl] = useState(
        SUPPORTED_BANKS[0]?.redirectUrl
    );
    const [isPending, startTransition] = useTransition();

    const handleAddMoney = () => {
        startTransition(async () => {
            await createOnRampTnx(amount *100, provider||"");
            window.location.href = redirectUrl ||"";
        });
    };

    return (
        <Card title="Add Money">
            <div className="space-y-5">
                <TextInput
                    label="Amount"
                    placeholder="Amount"
                    onChange={(value) => setAmount(Number(value))}
                />

                <div>
                    <label className="text-sm font-medium text-text">Bank</label>
                    <div className="mt-2">
                        <Select
                            onSelect={(value) => {
                                const bank = SUPPORTED_BANKS.find(
                                    (x) => x.name === value
                                );
                                setProvider(bank?.name ?? "");
                                setRedirectUrl(bank?.redirectUrl ?? "");
                            }}
                            options={SUPPORTED_BANKS.map((x) => ({
                                key: x.name,
                                value: x.name,
                            }))}
                        />
                    </div>
                </div>

                <div className="flex justify-center pt-4">
                    <Button disabled={isPending} onClick={handleAddMoney}>
                        {isPending ? "Processing..." : "Add Money"}
                    </Button>
                </div>
            </div>
        </Card>
    );
};
