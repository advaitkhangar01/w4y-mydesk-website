import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const username = process.env.INIT_ADMIN_USERNAME || "w4y_admin";
  const password = process.env.INIT_ADMIN_PASSWORD || "W4YMyDeskAdmin2026!Secure";

  const existingAdmin = await prisma.admin.findUnique({
    where: { username },
  });

  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    await prisma.admin.create({
      data: {
        username,
        passwordHash,
        role: "SUPER_ADMIN",
      },
    });

    console.log(`[Seed] Initial admin user "${username}" initialized successfully.`);
  } else {
    console.log(`[Seed] Admin user "${username}" already exists.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
