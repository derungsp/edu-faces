const { PrismaClient } = require("@prisma/client");
const { users, posts } = require("../src/app/lib/placeholder-data.js");
const bcrypt = require("bcrypt");

async function seedUsers(client) {
  try {
    // Hash passwords before seeding
    const usersWithHashedPassword = users.map((user) => ({
      ...user,
      password: bcrypt.hashSync(user.password, 10), // Hash the password
    }));

    const insertedUsers = await client.user.createMany({
      data: usersWithHashedPassword,
    });

    console.log(`Seeded ${insertedUsers.count} users`);
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedPosts(client) {
  try {
    const insertedPosts = await client.post.createMany({
      data: posts,
    });

    console.log(`Seeded ${insertedPosts.count} posts`);
  } catch (error) {
    console.error("Error seeding posts:", error);
    throw error;
  }
}

async function main() {
  const client = new PrismaClient();

  await seedUsers(client);
  await seedPosts(client);

  await client.$disconnect();
  // stop the script from hanging
  process.exit(0);
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err,
  );
  process.exit(1);
});
