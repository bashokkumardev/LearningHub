"use client";

import { useState } from "react";
import Script from "next/script";
import type { RazorpayPaymentResponse } from "@/lib/types";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

interface RazorpayCheckoutProps {
  amount: number;
  productName: string;
  productDescription: string;
  buttonLabel?: string;
  className?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  onSuccess?: (paymentId: string) => void;
}

export default function RazorpayCheckout({
  amount,
  productName,
  productDescription,
  buttonLabel = "Pay Now",
  className = "",
  customerName = "",
  customerEmail = "",
  customerPhone = "",
  onSuccess,
}: RazorpayCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    if (isStaticExport) {
      setStatus("error");
      setMessage(
        "Payments are disabled on GitHub Pages. Run locally with npm run dev and Razorpay keys for live checkout."
      );
      return;
    }

    setLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      const orderRes = await fetch(`${basePath}/api/razorpay/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, productName }),
      });

      if (!orderRes.ok) {
        const error = await orderRes.json();
        throw new Error(error.error || "Failed to create order");
      }

      const { orderId, amount: orderAmount, currency, keyId } = await orderRes.json();

      if (!window.Razorpay) {
        throw new Error("Razorpay SDK not loaded. Please refresh the page.");
      }

      const options = {
        key: keyId,
        amount: orderAmount,
        currency,
        name: "Learning Hub",
        description: productDescription,
        order_id: orderId,
        prefill: {
          name: customerName || undefined,
          email: customerEmail || undefined,
          contact: customerPhone || undefined,
        },
        theme: { color: "#6366f1" },
        handler: async (response: RazorpayPaymentResponse) => {
          const verifyRes = await fetch(`${basePath}/api/razorpay/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const result = await verifyRes.json();

          if (verifyRes.ok && result.success) {
            setStatus("success");
            setMessage("Payment successful! You will receive a confirmation email shortly.");
            onSuccess?.(response.razorpay_payment_id);
          } else {
            setStatus("error");
            setMessage(result.error || "Payment verification failed.");
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", (response) => {
        setStatus("error");
        setMessage(response.error.description || "Payment failed. Please try again.");
        setLoading(false);
      });
      razorpay.open();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isStaticExport && (
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      )}

      <div className="space-y-3">
        {isStaticExport && (
          <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-300">
            Demo site on GitHub Pages — browse courses and jobs. Payments work when deployed with a server (e.g. Vercel).
          </p>
        )}

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
        >
          {loading ? "Processing..." : isStaticExport ? "Preview Checkout" : buttonLabel}
        </button>

        {status === "success" && (
          <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
            {message}
          </div>
        )}
        {status === "error" && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {message}
          </div>
        )}
      </div>
    </>
  );
}
