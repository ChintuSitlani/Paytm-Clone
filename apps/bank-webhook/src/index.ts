import express from "express";
import db from "@repo/db/client";

const app = express();
app.use(express.json());

app.post("/hdfcWebhook", async (req: any, res: any) => {
    try {
        const { token, user_identifier, amount } = req.body;

        if (!token || !user_identifier || !amount) {
            return res.status(400).json({
                message: "Invalid webhook payload",
            });
        }

        const onRampTnx = await db.onRampTransaction.findUnique({
            where: {
                token
            }
        })
        if (!onRampTnx)
            res.status(404).json({ message: "Transaction not found!" })

        if (onRampTnx?.status !== "Processing")
            res.status(200).json({ message: "Transaction already processed" })

        await db.$transaction([
            db.balance.update({
                where: {
                    userId: Number(user_identifier),
                },
                data: {
                    amount: {
                        increment: Number(amount),
                    },
                },
            }),
            db.onRampTransaction.update({
                where: {
                    token,
                },
                data: {
                    status: "Success",
                },
            }),
        ]);

        return res.status(200).json({
            message: "Captured",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Error while processing webhook",
        });
    }
});

app.listen(3003, () => {
    console.log("Webhook server running on port 3003");
});
