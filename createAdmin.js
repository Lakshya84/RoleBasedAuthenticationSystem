const bcrypt = require("bcryptjs");
const userModel = require("./models/user");

const createAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const admin = await userModel.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      image:
        "https://t4.ftcdn.net/jpg/02/27/45/09/360_F_227450952_KQCMShHPOPebUXklULsKsROk5AvN6H1H.jpg",
      role: "admin",
    });

    console.log("Admin user created:", admin);
  } catch (error) {
    console.error("Error creating admin user:", error.message);
  }
};

createAdmin();
