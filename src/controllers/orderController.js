const prisma = require("../config/database");

const getOrders = async (req, res) => {
  try {
    const orders = await prisma.orders.findMany();
    res.status(200).send({ message: "Get Orders Successfully", data: orders });
  } catch {
    res.status(400).send({ message: "Get Orders Failed" });
  }
};

const createOrder = async (req, res) => {
  try {
    const newOrder = req.body;

    if (!newOrder.product_id || !newOrder.user_id || !newOrder.quantity) {
      return res.status(400).send({ message: "Failed to create order! All fields are required" });
    }

    const productExist = await prisma.products.findUnique({
      where: {
        id: newOrder.product_id,
      },
    });

    const userExist = await prisma.users.findUnique({
      where: {
        id: newOrder.user_id,
      },
    });

    if (!productExist) {
      return res.status(400).send({ message: "Product not found" });
    }

    if (!userExist) {
      return res.status(400).send({ message: "User not found" });
    }

    if (productExist && userExist) {
      const order = await prisma.orders.create({
        data: {
          product_id: newOrder.product_id,
          user_id: newOrder.user_id,
          quantity: newOrder.quantity,
        },
      });
      res.status(201).send({ message: "Create Order Successfully", data: order });
    }
  } catch {
    res.status(400).send({ message: "Create Order Failed" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id; // type data params: string
    const updateData = req.body;

    const orderExist = await prisma.orders.findUnique({
      where: {
        id: parseInt(orderId),
      },
    });

    if (!orderExist) {
      return res.status(400).send({ message: "Update Failed! Order not found" });
    }

    if (!updateData.product_id || !updateData.user_id || !updateData.quantity) {
      return res.status(400).send({ message: "Update Failed! All fields are required" });
    }

    const productExist = await prisma.products.findUnique({
      where: {
        id: updateData.product_id,
      },
    });

    const userExist = await prisma.users.findUnique({
      where: {
        id: updateData.user_id,
      },
    });

    if (!productExist) {
      return res.status(400).send({ message: "Update Failed! Product not found" });
    }

    if (!userExist) {
      return res.status(400).send({ message: "Update Failed! User not found" });
    }

    if (productExist && userExist) {
      const order = await prisma.orders.update({
        where: {
          id: parseInt(orderId), // changes to integer
        },
        data: {
          product_id: updateData.product_id,
          user_id: updateData.user_id,
          quantity: updateData.quantity,
        },
      });
      res.status(200).send({ message: `Update Order ID: ${orderId} Successfully`, data: order });
    }
  } catch {
    res.status(400).send({ message: "Failed Update Order" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id; // type data params: string
    await prisma.orders.delete({
      where: {
        id: parseInt(orderId), // changes to integer
      },
    });
    res.status(200).send({ message: `Delete Order ID: ${orderId} Successfully` });
  } catch {
    res.status(400).send({ message: "Failed Delete Order" });
  }
};

module.exports = { getOrders, createOrder, deleteOrder, updateOrder };
