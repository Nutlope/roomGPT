import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prismadb";
import Stripe from "stripe";
import { buffer } from "micro";
import Cors from "micro-cors";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET || "";

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"]!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        webhookSecret
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      // On error, log and return the error message.
      if (err! instanceof Error) console.log(err);
      console.log(`❌ Error message: ${errorMessage}`);
      res.status(400).send(`Webhook Error: ${errorMessage}`);
      return;
    }

    // Successfully constructed event.
    console.log("✅ Success:", event.id);

    // Cast event data to Stripe object.
    if (
      event.type === "payment_intent.succeeded" ||
      event.type === "checkout.session.completed"
    ) {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`💰 PaymentIntent: ${JSON.stringify(paymentIntent)}`);

      // @ts-ignore
      const userEmail = paymentIntent.charges.data[0].billing_details.email;
      let creditAmount = 0;

      // This is where the magic happens
      switch (paymentIntent.amount) {
        case 500:
        case 1000:
          creditAmount = 20;
          break;
        case 1500:
        case 3000:
          creditAmount = 80;
          break;
        case 2500:
          creditAmount = 160;
          break;
        case 5000:
        case 10000:
          creditAmount = 400;
          break;
      }
      await prisma.user.update({
        where: {
          email: userEmail,
        },
        data: {
          credits: {
            increment: creditAmount,
          },
        },
      });

      await prisma.purchase.create({
        data: {
          creditAmount: creditAmount,
          user: {
            connect: {
              email: userEmail,
            },
          },
        },
      });
    } else if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(
        `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
      );
    } else if (event.type === "charge.succeeded") {
      const charge = event.data.object as Stripe.Charge;
      console.log(`💵 Charge id: ${charge.id}`);
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event. Upgraded.
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default cors(webhookHandler as any);
