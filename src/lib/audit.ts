import { prisma } from "./prisma";
import { AuditAction } from "@prisma/client";

export interface LogAuditOptions {
  action: AuditAction;
  entityType?: string;
  entityId?: string;
  details?: Record<string, unknown> | string;
  ipAddress?: string;
  adminId?: string;
}

export async function logAudit(options: LogAuditOptions): Promise<void> {
  try {
    const detailsString =
      typeof options.details === "object"
        ? JSON.stringify(options.details)
        : options.details;

    await prisma.auditLog.create({
      data: {
        action: options.action,
        entityType: options.entityType,
        entityId: options.entityId,
        details: detailsString,
        ipAddress: options.ipAddress,
        adminId: options.adminId,
      },
    });
  } catch (error) {
    console.error("Failed to write audit log:", error);
  }
}
