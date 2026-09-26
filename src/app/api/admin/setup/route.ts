import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashPassword, isSystemBootstrapped } from "@/lib/auth";

const setupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(50),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const alreadySetup = await isSystemBootstrapped();
    if (alreadySetup) {
      return NextResponse.json(
        { error: "Admin account is already initialized. Bootstrap is locked." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const validated = setupSchema.parse(body);

    const passwordHash = await hashPassword(validated.password);

    await prisma.admin.create({
      data: {
        username: validated.username.trim(),
        passwordHash,
        role: "SUPER_ADMIN",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Admin account successfully initialized.",
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0]?.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to initialize admin account" }, { status: 500 });
  }
}
