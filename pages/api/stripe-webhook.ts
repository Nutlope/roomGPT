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
    console.log(event.type);
    // Cast event data to Stripe object.
    if (event.type === "checkout.session.completed") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`💰 PaymentIntent: ${JSON.stringify(paymentIntent)}`);
      console.log(paymentIntent);
      // @ts-ignore
      const userEmail = paymentIntent.customer_details.email;
      let creditAmount = 0;
      let plan = "basic";
      // @ts-ignore
      const paymentAmount = paymentIntent.amount_subtotal;
      console.log("emailprint", userEmail);
      switch (paymentAmount) {
        case 0:
          plan = "basic";
          break;
        case 900:
          plan = "creator";
          break;
        case 1000:
          creditAmount = 20;
          break;
        case 1900:
          plan = "pro";
          break;
        case 3000:
          creditAmount = 100;
          break;
        case 3500:
        case 5000:
          creditAmount = 250;
          break;
        case 7000:
        case 7900:
        case 10000:
          creditAmount = 750;
          break;
      }
      const update = await prisma.user.update({
        where: {
          email: userEmail,
        },
        data: {
          credits: {
            increment: creditAmount,
          },
          plan: plan,
        },
      });
      console.log(update);
      await prisma.purchase.create({
        data: {
          paymentAmount: paymentAmount,
          creditAmount: 0,
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
