const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.send({ message: "Get Products Successfully", data: products });
  } catch {
    res.send({ message: "Get Products Failed" });
  }
});

app.post("/products", async (req, res) => {
  try {
    const newProduct = req.body;
    const product = await prisma.product.create({
      data: {
        name: newProduct.name,
        price: newProduct.price,
        description: newProduct.description,
        image: newProduct.image,
      },
    });
    res.send({ message: "Create Product Successfully", data: product });
  } catch {
    res.send({ message: "Create Product Failed" });
  }
});

app.delete("/products/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        await prisma.product.delete({
            where: {
                id: parseInt(productId),
            }
        })
        res.send({ message: "Delete Product Successfully" })
    } catch {
        res.send({ message: "Failed Delete Product" })
    }
})


// Start server
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

// Close server
process.on("SIGINT", () => {
    server.close(() => {
        console.log("Server Disconnected");
        process.exit(0);
    });
})
