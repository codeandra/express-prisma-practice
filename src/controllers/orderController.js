const prisma = require("../config/database");

const getOrders = async (req, res) => {
  try {
    const orders = await prisma.orders.findMany();
    res.send({ message: "Get Orders Successfully", data: orders });
  } catch {
    res.send({ message: "Get Orders Failed" });
  }
};

const createOrder = async (req, res) => {
  try {
    const newOrder = req.body;
    const order = await prisma.orders.create({
      data: {
        product_id: newOrder.product_id,
        user_id: newOrder.user_id,
        quantity: newOrder.quantity,
      },
    });
    res.send({ message: "Create Order Successfully", data: order });
  } catch {
    res.send({ message: "Create Order Failed" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id; // type data params: string
    const updateData = req.body;
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
    res.send({ message: "Update Order Successfully", data: order });
  } catch {
    res.send({ message: "Failed Update Order" });
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
    res.send({ message: "Delete Order Successfully" });
  } catch {
    res.send({ message: "Failed Delete Order" });
  }
};

module.exports = { getOrders, createOrder, deleteOrder, updateOrder };
