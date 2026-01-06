"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(
        SUPPORTED_BANKS[0]?.redirectUrl
    );

    return (
        <Card title="Add Money">
            <div className="space-y-5">
                <TextInput
                    label="Amount"
                    placeholder="Amount"
                    onChange={() => { }}
                />

                <div>
                    <label className="text-sm font-medium text-text">
                        Bank
                    </label>
                    <div className="mt-2">
                        <Select
                            onSelect={(value) =>
                                setRedirectUrl(
                                    SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || ""
                                )
                            }
                            options={SUPPORTED_BANKS.map(x => ({
                                key: x.name,
                                value: x.name,
                            }))}
                        />
                    </div>
                </div>

                <div className="flex justify-center pt-4">
                    <Button onClick={() => window.location.href = redirectUrl || ""}>
                        Add Money
                    </Button>
                </div>
            </div>
        </Card>
    );
};
