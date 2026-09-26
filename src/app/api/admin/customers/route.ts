import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromSession } from "@/lib/auth";
import { CustomerStatus } from "@prisma/client";

export async function GET(req: NextRequest) {
  const admin = await getAdminFromSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.trim() || "";
  const statusFilter = searchParams.get("status") as CustomerStatus | null;

  const whereClause: Record<string, unknown> = {};

  if (search) {
    whereClause.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } },
      { businessName: { contains: search, mode: "insensitive" } },
    ];
  }

  if (statusFilter && Object.values(CustomerStatus).includes(statusFilter)) {
    whereClause.status = statusFilter;
  }

  const customers = await prisma.customer.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
      productAccesses: {
        include: {
          license: true,
          productHealth: true,
        },
      },
    },
  });

  return NextResponse.json({ success: true, customers });
}
