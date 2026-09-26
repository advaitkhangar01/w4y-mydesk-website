import { PaymentProvider } from "./types";
import { MockPaymentProvider } from "./providers/mock";
import { RazorpayProvider } from "./providers/razorpay";
import { CashfreeProvider } from "./providers/cashfree";

export * from "./types";

let currentProvider: PaymentProvider | null = null;

export function getPaymentProvider(): PaymentProvider {
  if (currentProvider) return currentProvider;

  const providerType = (process.env.PAYMENT_PROVIDER || "MOCK").toUpperCase();

  switch (providerType) {
    case "RAZORPAY":
      currentProvider = new RazorpayProvider();
      break;
    case "CASHFREE":
      currentProvider = new CashfreeProvider();
      break;
    case "MOCK":
    default:
      currentProvider = new MockPaymentProvider();
      break;
  }

  return currentProvider;
}
