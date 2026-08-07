const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
connectDB();

const promotionRoutes = require("./routes/promotionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        project: "Reward API",
        version: "1.0.0"
    });
});

// API Version 1
app.use("/api/v1/promotions", promotionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});