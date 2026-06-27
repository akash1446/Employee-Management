require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

async function seed() {
  await mongoose.connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/yourdb",
  );

  const exists = await User.findOne({ username: "admin" });
  if (exists) {
    console.log("Admin user already exists");
  } else {
    await User.create({ username: "admin", password: "Admin@123" });
    console.log("Admin user created — username: admin / password: Admin@123");
  }

  mongoose.disconnect();
}

seed();
