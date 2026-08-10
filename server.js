const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


dotenv.config();
connectDB();

const promotionRoutes = require("./routes/promotionRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes=require("./routes/userRoutes");
const taskSubmissionRoutes = require("./routes/taskSubmissionRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const currencyRoutes = require("./routes/currencyRoutes");
const transactionRoutes = require("./routes/transactionRoutes");



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
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/users",userRoutes);
app.use("/api/v1/submissions", taskSubmissionRoutes);
app.use("/api/v1/settings", settingsRoutes);
app.use("/api/v1/currencies", currencyRoutes);
app.use("/api/v1/transactions", transactionRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});