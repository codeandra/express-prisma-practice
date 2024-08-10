const express = require("express");
const PORT = require("./config/server");
const router = require("./routes/api");

const app = express();

app.use(express.json());
app.use("/api", router);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server Disconnected");
    process.exit(0);
  });
});

