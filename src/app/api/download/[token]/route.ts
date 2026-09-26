import { NextRequest, NextResponse } from "next/server";
import { verifyDownloadToken } from "@/lib/license";
import { prisma } from "@/lib/prisma";
import { OrderStatus, AccessStatus, LicenseStatus } from "@prisma/client";
import fs from "fs";
import path from "path";

export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params;

    // 1. Verify token signature and timestamp expiration
    const payload = verifyDownloadToken(token);
    if (!payload) {
      return NextResponse.json(
        {
          error: "Download authorization token is invalid or has expired.",
          instructions: "Please request a fresh download link through your access email or contact support at ceo@w4y.online.",
        },
        { status: 401 }
      );
    }

    // 2. Authoritatively verify in database: order, customer, access, and license
    const order = await prisma.order.findUnique({
      where: { id: payload.orderId },
      include: {
        productAccess: {
          include: { license: true },
        },
      },
    });

    if (!order || order.status !== OrderStatus.PAID) {
      return NextResponse.json(
        { error: "Access denied. Order is not paid or verified." },
        { status: 403 }
      );
    }

    if (!order.productAccess || order.productAccess.status !== AccessStatus.ACTIVE) {
      return NextResponse.json(
        { error: "Access denied. Product access is inactive or suspended." },
        { status: 403 }
      );
    }

    if (!order.productAccess.license || order.productAccess.license.status !== LicenseStatus.ACTIVE) {
      return NextResponse.json(
        { error: "Access denied. Commercial license is revoked or suspended." },
        { status: 403 }
      );
    }

    // 3. Locate the build binary package on server/Hostinger VPS storage
    const storageDir = process.env.PROTECTED_DOWNLOAD_DIR || "./protected_downloads";
    const appFileName = "MyDesk-Setup-x64.exe"; // Target installer package
    const filePath = path.resolve(storageDir, appFileName);

    if (!fs.existsSync(filePath)) {
      // In production, when installer binary is being uploaded to Hostinger VPS:
      // provide clean, clear status and allow retry once package file is deployed.
      return NextResponse.json(
        {
          status: "AUTHORIZED",
          message: "Your download access is fully verified and authorized.",
          product: "W4Y MyDesk",
          licenseKey: order.productAccess.license.licenseKey,
          packageStatus: "Package deployment in progress on Hostinger VPS. The downloadable installer will be accessible shortly.",
          supportEmail: "ceo@w4y.online",
        },
        { status: 200 }
      );
    }

    // If file exists, stream it as protected download attachment
    const fileStat = fs.statSync(filePath);
    const fileStream = fs.createReadStream(filePath);

    // Convert node readstream to web ReadableStream
    const readable = new ReadableStream({
      start(controller) {
        fileStream.on("data", (chunk) => controller.enqueue(chunk));
        fileStream.on("end", () => controller.close());
        fileStream.on("error", (err) => controller.error(err));
      },
    });

    return new NextResponse(readable, {
      headers: {
        "Content-Disposition": `attachment; filename="${appFileName}"`,
        "Content-Type": "application/octet-stream",
        "Content-Length": fileStat.size.toString(),
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Protected download error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during download validation." },
      { status: 500 }
    );
  }
}
