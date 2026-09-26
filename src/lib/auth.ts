import bcrypt from "bcryptjs";
import crypto from "crypto";
import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { APP_CONFIG } from "./config";

// Simple in-memory rate limiting for brute-force protection
const loginAttempts = new Map<string, { count: number; blockedUntil: number }>();

export function checkLoginRateLimit(ip: string): { isBlocked: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (!record) {
    return { isBlocked: false, retryAfterSeconds: 0 };
  }

  if (record.blockedUntil > now) {
    const retryAfterSeconds = Math.ceil((record.blockedUntil - now) / 1000);
    return { isBlocked: true, retryAfterSeconds };
  }

  // If block expired, reset
  if (record.blockedUntil <= now && record.count >= 5) {
    loginAttempts.delete(ip);
  }

  return { isBlocked: false, retryAfterSeconds: 0 };
}

export function recordFailedLogin(ip: string): void {
  const now = Date.now();
  const record = loginAttempts.get(ip) || { count: 0, blockedUntil: 0 };
  record.count += 1;

  if (record.count >= 5) {
    record.blockedUntil = now + 15 * 60 * 1000; // 15 minute lock after 5 consecutive failures
  }

  loginAttempts.set(ip, record);
}

export function resetLoginAttempts(ip: string): void {
  loginAttempts.delete(ip);
}

export async function hashPassword(plain: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(plain, salt);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export async function createAdminSession(adminId: string): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + APP_CONFIG.admin.sessionDurationSeconds * 1000);

  await prisma.adminSession.create({
    data: {
      token,
      adminId,
      expiresAt,
    },
  });

  const cookieStore = cookies();
  cookieStore.set(APP_CONFIG.admin.sessionCookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return token;
}

export async function getAdminFromSession(): Promise<{ id: string; username: string } | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(APP_CONFIG.admin.sessionCookieName)?.value;

    if (!token) return null;

    const session = await prisma.adminSession.findUnique({
      where: { token },
      include: { admin: true },
    });

    if (!session) return null;

    if (new Date() > session.expiresAt) {
      await prisma.adminSession.delete({ where: { token } }).catch(() => {});
      return null;
    }

    return {
      id: session.admin.id,
      username: session.admin.username,
    };
  } catch {
    return null;
  }
}

export async function destroyAdminSession(): Promise<void> {
  const cookieStore = cookies();
  const token = cookieStore.get(APP_CONFIG.admin.sessionCookieName)?.value;

  if (token) {
    await prisma.adminSession.delete({ where: { token } }).catch(() => {});
    cookieStore.delete(APP_CONFIG.admin.sessionCookieName);
  }
}

/**
 * Checks if an admin account already exists.
 */
export async function isSystemBootstrapped(): Promise<boolean> {
  const count = await prisma.admin.count();
  return count > 0;
}
