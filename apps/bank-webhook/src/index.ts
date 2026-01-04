import express from 'express';
const app = express();
import db from "@repo/db/client";

app.post('/hdfcWebhook', async (req, res) => {
    const paymentInfo = {
        token: String,
        userId: String,
        amount: String
    } = {
        token: req.body.token,
        userId: req.body.user_Identifier,
        amount: req.body.amount
    };
    try {
        await db.$transaction([
            db.balance.update({
                where: {
                    userId: Number(paymentInfo.userId)
                },
                data: {
                    amount:{ increment:Number(paymentInfo.amount)}
                }
            }),
            db.onRampTransaction.update({
                where: {
                    token: paymentInfo.token
                },
                data: {
                    status: 'Success'
                }
            })
        ])
        res.status(200).json({
            message:"Captured"
        })
    } catch (err) {
        res.status(411).json({
            message:"error while processing webhook"
        })
    }
})

app.listen(3003);