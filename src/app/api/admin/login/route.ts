import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  verifyPassword,
  createAdminSession,
  checkLoginRateLimit,
  recordFailedLogin,
  resetLoginAttempts,
} from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { AuditAction } from "@prisma/client";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.ip || "127.0.0.1";

    // 1. Check brute force rate limiting
    const rateLimit = checkLoginRateLimit(ip);
    if (rateLimit.isBlocked) {
      return NextResponse.json(
        {
          error: `Too many failed login attempts. Please wait ${rateLimit.retryAfterSeconds} seconds before trying again.`,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validated = loginSchema.parse(body);

    // 2. Fetch admin user
    const admin = await prisma.admin.findUnique({
      where: { username: validated.username.trim() },
    });

    if (!admin) {
      recordFailedLogin(ip);
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // 3. Verify password
    const isMatch = await verifyPassword(validated.password, admin.passwordHash);
    if (!isMatch) {
      recordFailedLogin(ip);
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Success: reset rate limit & update last login
    resetLoginAttempts(ip);
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date() },
    });

    // 4. Create secure HTTP-only session cookie
    await createAdminSession(admin.id);

    // 5. Audit log
    await logAudit({
      action: AuditAction.ADMIN_LOGIN,
      adminId: admin.id,
      ipAddress: ip,
      details: { username: admin.username },
    });

    return NextResponse.json({
      success: true,
      user: { username: admin.username },
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0]?.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
