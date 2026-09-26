"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { APP_CONFIG } from "@/lib/config";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle2, ShieldCheck, Lock, AlertCircle, ArrowRight } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeStep, setActiveStep] = useState<"form" | "processing" | "confirming">("form");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage("Please provide both your name and email address.");
      return;
    }

    try {
      setIsSubmitting(true);
      setActiveStep("processing");

      // 1. Initiate order creation on server
      const res = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          businessName: formData.businessName.trim() || undefined,
          currency: APP_CONFIG.commercial.currency,
        }),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.success) {
        throw new Error(orderData.error || "Failed to initialize checkout order.");
      }

      // 2. Payment Provider processing
      if (orderData.provider === "MOCK") {
        // Safe development verification: triggers server-side verification with mock IDs
        setActiveStep("confirming");
        const verifyRes = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: orderData.orderId,
            providerOrderId: orderData.clientPayload.orderId,
            providerPaymentId: `mock_pay_${Date.now()}`,
          }),
        });

        const verifyData = await verifyRes.json();
        if (!verifyRes.ok || !verifyData.success) {
          throw new Error(verifyData.error || "Payment verification failed.");
        }

        // Redirect to authoritative Order Confirmation page
        router.push(`/order/${orderData.orderNumber}`);
      } else if (orderData.provider === "RAZORPAY") {
        // Razorpay integration handling
        if (typeof window !== "undefined" && (window as unknown as { Razorpay: unknown }).Razorpay) {
          // Razorpay standard modal would trigger here
          alert("Razorpay gateway ready. Please set live credentials in production environment.");
        } else {
          router.push(`/order/${orderData.orderNumber}`);
        }
      } else {
        router.push(`/order/${orderData.orderNumber}`);
      }
    } catch (err: unknown) {
      console.error("Checkout submission failed:", err);
      const msg = err instanceof Error ? err.message : "An error occurred during checkout.";
      setErrorMessage(msg);
      setActiveStep("form");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 md:py-20 bg-w4y-soft dark:bg-w4y-dark-bg min-h-[calc(100vh-64px-200px)]">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-w4y-blue">
              Commercial Checkout
            </span>
            <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-w4y-dark dark:text-white">
              Purchase {APP_CONFIG.commercial.productName}
            </h1>
            <p className="mt-1 text-sm text-w4y-secondary dark:text-w4y-dark-muted">
              Complete your information to generate your commercial license and proforma invoice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left: Customer & Billing Form */}
            <div className="md:col-span-7">
              <Card className="p-6 md:p-8">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-lg font-bold">Customer Details</CardTitle>
                  <CardDescription>
                    Information used for license assignment, proforma invoice, and email delivery.
                  </CardDescription>
                </CardHeader>

                {errorMessage && (
                  <div className="mb-6 p-4 rounded-lg bg-[#FCE8E6] border border-[#FAD2CF] text-[#A50E0E] text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Full Name *"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Advait Khangar"
                    required
                    disabled={isSubmitting}
                  />

                  <Input
                    label="Email Address *"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. name@company.com"
                    helperText="Your license key and download credentials will be delivered here."
                    required
                    disabled={isSubmitting}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Phone Number (Optional)"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 9876543210"
                      disabled={isSubmitting}
                    />

                    <Input
                      label="Business / Firm Name (Optional)"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="e.g. Design Studio"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="pt-4 border-t border-w4y-border dark:border-w4y-dark-border space-y-4">
                    <div className="flex items-center gap-2 text-xs text-w4y-secondary dark:text-w4y-dark-muted">
                      <Lock className="w-3.5 h-3.5 text-w4y-blue" />
                      <span>Encrypted SSL 256-bit server-side verification</span>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full text-base font-semibold"
                      isLoading={isSubmitting}
                    >
                      {activeStep === "processing"
                        ? "Initializing Secure Order..."
                        : activeStep === "confirming"
                        ? "Authorizing & Generating License..."
                        : `Pay ${formatCurrency(APP_CONFIG.commercial.price, APP_CONFIG.commercial.currency)}`}
                    </Button>
                  </div>
                </form>
              </Card>
            </div>

            {/* Right: Order Summary */}
            <div className="md:col-span-5 space-y-6">
              <Card className="p-6">
                <CardHeader className="p-0 mb-4 pb-4 border-b border-w4y-border dark:border-w4y-dark-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-base text-w4y-dark dark:text-white">
                        {APP_CONFIG.commercial.productName}
                      </h3>
                      <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted">
                        {APP_CONFIG.commercial.model}
                      </p>
                    </div>
                    <span className="text-xl font-extrabold text-w4y-dark dark:text-white">
                      {formatCurrency(APP_CONFIG.commercial.price, APP_CONFIG.commercial.currency)}
                    </span>
                  </div>
                </CardHeader>

                <div className="space-y-3 text-xs text-w4y-dark dark:text-w4y-dark-text">
                  <h4 className="font-bold uppercase tracking-wider text-w4y-secondary dark:text-w4y-dark-muted">
                    Included with your license:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-w4y-success shrink-0" />
                      <span>Downloadable application package</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-w4y-success shrink-0" />
                      <span>One-device permanent license</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-w4y-success shrink-0" />
                      <span>Cryptographic license key</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-w4y-success shrink-0" />
                      <span>Protected download access (Hostinger VPS)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-w4y-success shrink-0" />
                      <span>Official W4Y proforma invoice</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-w4y-border dark:border-w4y-dark-border space-y-2 text-xs">
                  <div className="flex justify-between text-w4y-secondary dark:text-w4y-dark-muted">
                    <span>Subtotal</span>
                    <span>{formatCurrency(APP_CONFIG.commercial.price, APP_CONFIG.commercial.currency)}</span>
                  </div>
                  <div className="flex justify-between text-w4y-secondary dark:text-w4y-dark-muted">
                    <span>GST (Initially exempt/unregistered)</span>
                    <span>₹0</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-w4y-dark dark:text-white pt-2 border-t border-w4y-border dark:border-w4y-dark-border">
                    <span>Total Due</span>
                    <span>{formatCurrency(APP_CONFIG.commercial.price, APP_CONFIG.commercial.currency)}</span>
                  </div>
                </div>
              </Card>

              <div className="p-4 rounded-card border border-w4y-border bg-white dark:border-w4y-dark-border dark:bg-w4y-dark-surface space-y-2 text-xs text-w4y-secondary dark:text-w4y-dark-muted">
                <p className="font-semibold text-w4y-dark dark:text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-w4y-blue" />
                  Official Seller Identity
                </p>
                <p>
                  {APP_CONFIG.business.legalName}<br />
                  {APP_CONFIG.business.addressLine1} {APP_CONFIG.business.cityStateZip}<br />
                  Email: {APP_CONFIG.business.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
