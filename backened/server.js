const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();

const app = express();

app.set("trust proxy", 1);

// connect database
connectDB().then(async () => {
  const User = require("./models/User");
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  const existingAdmin = await User.findOne({ role: "admin" });

  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(adminPassword, salt);

    const user = new User({
      name: "Administrator",
      email: adminEmail,
      password: hashed,
      role: "admin"
    });

    await user.save();
    console.log("Default admin created:", adminEmail);
  }
}).catch(err => {
  console.error("DB connection error", err);
});


// middleware

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json({ limit: "5mb" }));
app.use("/uploads", express.static("uploads"));


// rate limiter
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({ windowMs: 1 * 60 * 1000, max: 100 });
app.use(limiter);


// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/biodata", require("./routes/biodataRoutes"));



// ---------- FRONTEND SERVING ----------

const buildPath = path.join(__dirname, "frontened-build");

// serve assets
app.use("/assets", express.static(path.join(buildPath, "assets")));

// serve static files
app.use(express.static(buildPath, { index: false }));

// react fallback
app.use((req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});


// ---------- GLOBAL ERROR HANDLER ----------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});