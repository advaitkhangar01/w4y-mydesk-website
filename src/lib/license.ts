import crypto from "crypto";

const DOWNLOAD_SECRET =
  process.env.DOWNLOAD_SIGNING_SECRET || "w4y_download_signing_token_secret_hostinger_vps_default";

/**
 * Generates a cryptographically strong license key.
 * Format: W4Y-MD-XXXX-XXXX-XXXX (uppercase hexadecimal / alphanumeric chunks)
 */
export function generateSecureLicenseKey(): string {
  const bytes = crypto.randomBytes(9);
  const hex = bytes.toString("hex").toUpperCase();
  const chunk1 = hex.substring(0, 4);
  const chunk2 = hex.substring(4, 8);
  const chunk3 = hex.substring(8, 12);
  const chunk4 = hex.substring(12, 16);
  return `W4Y-MD-${chunk1}-${chunk2}-${chunk3}-${chunk4}`;
}

/**
 * Creates a cryptographically signed expirable download token.
 * Token structure: base64url({ orderId, accessId, exp }) + "." + hmacSignature
 */
export function createDownloadToken(orderId: string, accessId: string, expiryMinutes = 60): string {
  const expiresAt = Date.now() + expiryMinutes * 60 * 1000;
  const payload = JSON.stringify({ orderId, accessId, exp: expiresAt });
  const encodedPayload = Buffer.from(payload).toString("base64url");

  const signature = crypto
    .createHmac("sha256", DOWNLOAD_SECRET)
    .update(encodedPayload)
    .digest("base64url");

  return `${encodedPayload}.${signature}`;
}

/**
 * Verifies a signed download token.
 * Returns null if invalid or expired.
 */
export function verifyDownloadToken(
  token: string
): { orderId: string; accessId: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [encodedPayload, signature] = parts;
    const expectedSignature = crypto
      .createHmac("sha256", DOWNLOAD_SECRET)
      .update(encodedPayload)
      .digest("base64url");

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8"));
    if (Date.now() > payload.exp) {
      return null; // Expired
    }

    return { orderId: payload.orderId, accessId: payload.accessId };
  } catch {
    return null;
  }
}
