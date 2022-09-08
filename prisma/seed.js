const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const seed = async () => {
  const hashed1 = await bcrypt.hash("noemi", 10)
  const hashed2 = await bcrypt.hash("luca", 10)
  
  const createdUser = await prisma.user.create({
      data: {
        username: "Noemi",
        password: hashed1,
        movies: {
          create: [
            {
              title: "Avengers",
              description: "Action",
              runtimeMins: 120
            },
            {
              title: "Avengers 2",
              description: "Action",
              runtimeMins: 150
            }
          ]
        }
      }
    })

  const createSecondUser = await prisma.user.create({
      data: {
        username: "Luca",
        password: hashed2,
        movies: {
          create: [
            {
              title: "Spiderman",
              description: "Action",
              runtimeMins: 100
            }
          ]
        }
      }
    })
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })