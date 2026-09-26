// Centralized configuration for W4Y MyDesk Commercial System

export const APP_CONFIG = {
  brand: {
    name: "W4Y",
    product: "MyDesk",
    tagline: "Your business, at your desk.",
    proposition: "Clients. Projects. Meetings. Quotes. Invoices. Payments — all in one place.",
    domain: process.env.NEXT_PUBLIC_PRIMARY_DOMAIN || "w4y.online",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  },
  commercial: {
    productName: "MyDesk",
    price: Number(process.env.NEXT_PUBLIC_PRODUCT_PRICE || 5000),
    currency: process.env.NEXT_PUBLIC_PRODUCT_CURRENCY || "INR",
    model: "One-time purchase",
    licenseScope: "One license = one device/computer",
  },
  business: {
    legalName: "W4Y",
    addressLine1: "Plot no. 7, New Sneh Nagar,",
    addressLine2: "Wardha Road,",
    cityStateZip: "Nagpur, Maharashtra - 440015",
    email: "ceo@w4y.online",
    phone: "+91 7798647265",
    website: "w4y.online",
    gstRegistered: false, // No GST initially as per specification
  },
  admin: {
    loginPath: "/adm-log-in-65", // Secret administrative route
    sessionCookieName: "w4y_admin_session",
    sessionDurationSeconds: 60 * 60 * 12, // 12 hours
  },
  security: {
    downloadTokenExpiryMinutes: 60, // Signed temporary download URL lifetime
  },
};
