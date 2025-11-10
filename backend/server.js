const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./app/config/db");
const UploadRoute = require("./app/routers/UploadRoute");
const SalesRoute = require("./app/routers/SalesRoute");
const ErrorHandler = require("./app/middleware/ErrorHandler");


require("dotenv").config();
connectDB();

// allowed origins for cors
const allowedOrigins = ["http://localhost:5173"];

// middleware
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// test route
app.get("/test", (req, res) => res.send("Test api route"));

app.use("/api/upload", UploadRoute);
app.use("/api/sales", SalesRoute);

// global error handler
app.use(ErrorHandler);

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));
