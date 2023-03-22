import { useSession } from "next-auth/react";
import Script from "next/script";

export default function Pricing() {
  const { data: session, status } = useSession();

  // TODO: See if I can refactor this to import code from an npm library OR use a custom API route and build this code myself
  return (
    <>
      <Script async src="https://js.stripe.com/v3/pricing-table.js" />
      <div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-white">
              Pricing
            </h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Pricing plans for roomGPT
            </p>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-500 mb-10">
          Buy credits below. Blah blah. You currently have X credits.
        </p>
        {session?.user?.email && (
          // @ts-ignore
          <stripe-pricing-table
            pricing-table-id="prctbl_1Mnn7OK4W9ejG97eWNmB45OY"
            publishable-key="pk_test_51HGpOvK4W9ejG97ePLAyLnDfsMlDWOASdYzamM8fzmApLnKokbVmqWB0tGIpLGSUscTF7NlxU3VvAArbr47KHe8A00c7Th5jPD"
            client-reference-id={session.user.email}
            customer-email={session.user.email}
          />
        )}
      </div>
    </>
  );
}

// TODO:
// add a query param with ?success=true to the redirect url so I can share a "Congrats you bought credits" message or toast
// Add a list of things folks will get like priority support, feature requests, ect...
// also gate this page behind auth?
