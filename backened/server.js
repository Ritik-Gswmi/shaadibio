const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();

const app = express();

app.set("trust proxy", 1); // This helps to rate limiter work correctly behind proxies, when deploying on services like Render, Railway, etc.

// connect database
connectDB().then(async () => {
  // ensure at least one admin user exists
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
// basic cors config - permit the client URL or any localhost port in development
const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (e.g. curl, mobile apps)
    if (!origin) return callback(null, true);
    const allowed = [
      process.env.CLIENT_URL,
      "http://localhost:5173",
      "http://localhost:5174",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174"
    ].filter(Boolean);
    if (allowed.includes(origin) || origin.match(/^http:\/\/localhost:\d+$/)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '5mb' }));
app.use("/uploads", express.static("uploads"));

// simple rate limiter
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({ windowMs: 1*60*1000, max: 100 });
app.use(limiter);

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/biodata", require("./routes/biodataRoutes"));


app.use("/assets", express.static(path.join(__dirname, "frontened-build/assets")));
app.use(express.static(path.join(__dirname, "frontened-build")));

app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, "frontened-build", "index.html")
  );
});


// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});



const PORT = process.env.PORT || 5000;





app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});