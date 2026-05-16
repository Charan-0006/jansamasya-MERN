const express = require("express");
const cors = require("cors");

require("dotenv").config();

const connectDB = require("./config/db");

const issueRoutes = require("./routes/issueRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://jansamasya-mern.vercel.app"
    ],

    credentials: true,
  })
);

app.use(express.json());
app.use("/api/contact", contactRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});