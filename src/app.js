const express = require("express");
const PORT = require("./config/server");

const app = express();

app.use(express.json());

// routes
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

app.use('/user', userRoutes)
app.use('/product', productRoutes)
app.use('/order', orderRoutes)

const server = app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server Disconnected");
    process.exit(0);
  });
});

