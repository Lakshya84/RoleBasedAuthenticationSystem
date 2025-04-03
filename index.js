const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { authenticate } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const userModel = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/auth/login", (req, res) => {
  res.render("login");
});

app.get("/auth/signup", (req, res) => {
  res.render("signup");
});

app.get("/read", authenticate, async (req, res) => {
  try {
    console.log("Logged-in user:", req.user);
    const allUsers = await userModel.find();
    res.render("read", { users: allUsers, currentUser: req.user });
  } catch (error) {
    res.status(500).send("Error loading users");
  }
});

app.get("/delete/:id", authenticate, async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return res.status(404).send("User not found"); // Handle case where user is not found
    }

    // Allow only admin or the user themselves to delete
    if (req.user.role !== "admin" && req.user.id !== user._id.toString()) {
      return res.status(403).send("Access denied");
    }

    await userModel.findByIdAndDelete(req.params.id);
    res.redirect("/read");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Error deleting user");
  }
});

app.get("/edit/:id", authenticate, async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (req.user.role !== "admin" && req.user.id !== user._id.toString()) {
      return res.status(403).send("Access denied");
    }

    res.render("edit", { user });
  } catch (error) {
    console.error("Error loading user:", error);
    res.status(500).send("Error loading user");
  }
});

app.post("/update/:id", authenticate, async (req, res) => {
  let { name, email, image } = req.body;
  await userModel.findOneAndUpdate(
    { _id: req.params.id },
    { name, email, image },
    { new: true }
  );
  res.redirect("/read");
});

app.post("/create", authenticate, async (req, res) => {
  let { name, email, image } = req.body;
  await userModel.create({ name, email, image });
  res.redirect("/read");
});

app.listen(3000, () => console.log("Server running on port 3000"));
