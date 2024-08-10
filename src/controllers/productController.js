const prisma = require("../config/database");

const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.send({ message: "Get Products Successfully", data: products });
  } catch {
    res.send({ message: "Get Products Failed" });
  }
};

const createProduct = async (req, res) => {
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
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id; // type data params: string
    await prisma.product.delete({
      where: {
        id: parseInt(productId), // changes to integer
      },
    });
    res.send({ message: "Delete Product Successfully" });
  } catch {
    res.send({ message: "Failed Delete Product" });
  }
};

module.exports = { getProducts, createProduct, deleteProduct };