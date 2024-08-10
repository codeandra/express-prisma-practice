const prisma = require("../config/database");

const getProducts = async (req, res) => {
  try {
    const products = await prisma.products.findMany();
    res.send({ message: "Get Products Successfully", data: products });
  } catch {
    res.send({ message: "Get Products Failed" });
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const product = await prisma.products.create({
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

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id; // type data params: string
    const updateData = req.body;
    const product = await prisma.products.update({
      where: {
        id: parseInt(productId), // changes to integer
      },
      data: {
        name: updateData.name,
        price: updateData.price,
        description: updateData.description,
        image: updateData.image,
      },
    });
    res.send({ message: "Update Product Successfully", data: product });
  } catch {
    res.send({ message: "Failed Update Product" });
  }
}

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id; // type data params: string
    await prisma.products.delete({
      where: {
        id: parseInt(productId), // changes to integer
      },
    });
    res.send({ message: "Delete Product Successfully" });
  } catch {
    res.send({ message: "Failed Delete Product" });
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };