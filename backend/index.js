const express = require("express");
const dotenv = require("dotenv");
// Loading ENV values
dotenv.config();
const mongo = require("./connections/mongo");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Routes
app.use("/api/tasks", taskRoutes);

const startServer = async () => {
  // Loading mongo
  await mongo();
  // Start server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
