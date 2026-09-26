import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ProductHealthState, LicenseStatus } from "@prisma/client";

const healthUpdateSchema = z.object({
  licenseKey: z.string().min(1, "License key is required"),
  deviceId: z.string().min(1, "Device ID is required"),
  deviceName: z.string().optional(),
  state: z.nativeEnum(ProductHealthState).default(ProductHealthState.HEALTHY),
  clientVersion: z.string().optional(),
  osInfo: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    // Authenticate client with shared secret header OR valid license authentication
    const authHeader = req.headers.get("authorization");
    const configuredSecret = process.env.HEALTH_API_SECRET;

    if (configuredSecret && (!authHeader || authHeader !== `Bearer ${configuredSecret}`)) {
      return NextResponse.json({ error: "Unauthorized telemetry access" }, { status: 401 });
    }

    const body = await req.json();
    const validated = healthUpdateSchema.parse(body);

    // Look up license
    const license = await prisma.license.findUnique({
      where: { licenseKey: validated.licenseKey },
      include: {
        productAccess: {
          include: { productHealth: true },
        },
      },
    });

    if (!license) {
      return NextResponse.json({ error: "Invalid license" }, { status: 404 });
    }

    if (license.status !== LicenseStatus.ACTIVE) {
      return NextResponse.json(
        { error: `License is not active. Current status: ${license.status}` },
        { status: 403 }
      );
    }

    // 1-device model enforcement / binding
    if (!license.deviceId) {
      // First activation on this device
      await prisma.license.update({
        where: { id: license.id },
        data: {
          deviceId: validated.deviceId,
          deviceName: validated.deviceName || null,
          activatedAt: new Date(),
          lastValidatedAt: new Date(),
        },
      });
    } else if (license.deviceId !== validated.deviceId) {
      // Trying to run on an unauthorized 2nd device!
      return NextResponse.json(
        {
          error: "License device mismatch. MyDesk license is valid for one device only.",
          boundDeviceId: license.deviceId,
        },
        { status: 409 }
      );
    } else {
      await prisma.license.update({
        where: { id: license.id },
        data: { lastValidatedAt: new Date() },
      });
    }

    // Update real product health
    const now = new Date();
    const updatedHealth = await prisma.productHealth.upsert({
      where: { accessId: license.accessId },
      create: {
        accessId: license.accessId,
        state: validated.state,
        lastHeartbeat: now,
        lastChecked: now,
        clientVersion: validated.clientVersion,
        osInfo: validated.osInfo,
      },
      update: {
        state: validated.state,
        lastHeartbeat: now,
        lastChecked: now,
        clientVersion: validated.clientVersion || undefined,
        osInfo: validated.osInfo || undefined,
      },
    });

    return NextResponse.json({
      success: true,
      state: updatedHealth.state,
      lastHeartbeat: updatedHealth.lastHeartbeat,
    });
  } catch (error: unknown) {
    console.error("Telemetry health update error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0]?.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Telemetry update failed" }, { status: 500 });
  }
}
