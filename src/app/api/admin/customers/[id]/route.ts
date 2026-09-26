import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromSession } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { CustomerStatus, AccessStatus, LicenseStatus, AuditAction } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await getAdminFromSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const customer = await prisma.customer.findUnique({
    where: { id: params.id },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
        include: {
          payment: true,
          proformaInvoice: true,
        },
      },
      productAccesses: {
        include: {
          license: true,
          productHealth: true,
        },
      },
    },
  });

  if (!customer) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, customer });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await getAdminFromSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const customer = await prisma.customer.findUnique({
      where: { id: params.id },
      include: { productAccesses: { include: { license: true } } },
    });

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    const {
      name,
      email,
      phone,
      businessName,
      status: customerStatus,
      accessStatus,
      licenseStatus,
    } = body;

    // 1. Update basic info and customer status
    const updateData: Record<string, unknown> = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (businessName !== undefined) updateData.businessName = businessName;
    if (customerStatus && Object.values(CustomerStatus).includes(customerStatus)) {
      updateData.status = customerStatus;
    }

    const updatedCustomer = await prisma.customer.update({
      where: { id: customer.id },
      data: updateData,
    });

    // 2. Update product access status if requested
    if (accessStatus && Object.values(AccessStatus).includes(accessStatus)) {
      await prisma.productAccess.updateMany({
        where: { customerId: customer.id },
        data: { status: accessStatus },
      });

      await logAudit({
        action:
          accessStatus === AccessStatus.ACTIVE
            ? AuditAction.ACCESS_ACTIVATED
            : AuditAction.ACCESS_DEACTIVATED,
        adminId: admin.id,
        entityType: "ProductAccess",
        entityId: customer.id,
        details: { accessStatus },
      });
    }

    // 3. Update license status if requested
    if (licenseStatus && Object.values(LicenseStatus).includes(licenseStatus)) {
      for (const pa of customer.productAccesses) {
        if (pa.license) {
          await prisma.license.update({
            where: { id: pa.license.id },
            data: { status: licenseStatus },
          });
        }
      }
    }

    // 4. If customer is suspended, record audit log
    if (customerStatus === CustomerStatus.SUSPENDED) {
      await logAudit({
        action: AuditAction.CUSTOMER_SUSPENDED,
        adminId: admin.id,
        entityType: "Customer",
        entityId: customer.id,
        details: { status: customerStatus },
      });
    } else {
      await logAudit({
        action: AuditAction.CUSTOMER_UPDATED,
        adminId: admin.id,
        entityType: "Customer",
        entityId: customer.id,
        details: updateData,
      });
    }

    return NextResponse.json({ success: true, customer: updatedCustomer });
  } catch (error) {
    console.error("Customer update error:", error);
    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 });
  }
}
