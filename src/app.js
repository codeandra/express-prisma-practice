const express = require("express");
const PORT = require("./config/server");
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(helmet()); // to secure your app
app.use(cors()); // to secure your app
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.static(path.join(__dirname, "public"))); // to serve static files

// routes index
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/views/index.html");
});

// routes
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

// list api routes
const listApi = {
  data: [
    { url: "/users", method: "GET", description: "Get all users", name: "users" },
    { url: "/users", method: "POST", description: "Create new user", name: "users" },
    { url: "/users/:id", method: "PATCH", description: "Update user", name: "users" },
    { url: "/users/:id", method: "PUT", description: "Update user", name: "users" },
    { url: "/users/:id", method: "DELETE", description: "Delete user", name: "users" },
    { url: "/products", method: "GET", description: "Get all products", name: "products" },
    { url: "/products", method: "POST", description: "Create new product", name: "products" },
    { url: "/products/:id", method: "PATCH", description: "Update product", name: "products" },
    { url: "/products/:id", method: "PUT", description: "Update product", name: "products" },
    { url: "/products/:id", method: "DELETE", description: "Delete product", name: "products" },
    { url: "/orders", method: "GET", description: "Get all orders", name: "orders" },
    { url: "/orders", method: "POST", description: "Create new order", name: "orders" },
    { url: "/orders/:id", method: "PATCH", description: "Update order", name: "orders" },
    { url: "/orders/:id", method: "PUT", description: "Update order", name: "orders" },
    { url: "/orders/:id", method: "DELETE", description: "Delete order", name: "orders" },
  ]
}

app.get('/list-api', (req, res) => {
  const query = req.query
  let filtered = listApi.data

  if(Object.keys(query).length > 0) {
    filtered = listApi.data.filter(api => {
      return Object.keys(query).every(key => {
        return api[key] === query[key]
        })
    })
  }

  res.status(200).json(filtered || listApi.data)
})

const server = app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server Disconnected");
    process.exit(0);
  });
});

