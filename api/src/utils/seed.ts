import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "example@gmail.com",
      password: await bcrypt.hash("password", 10),
      items: {
        createMany: {
          data: [
            {
              name: "Google",
              username: "example@gmail.com",
                            // TODO: use encryption helper method
              // password: "supersecretpassword1",
            },
          ],
        },
      },
    },
  });
  console.log(`[LOG] Created user with id: ${user.id}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
