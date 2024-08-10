const prisma = require("../config/database");

const getUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.send({ message: "Get Users Successfully", data: users });
  } catch {
    res.send({ message: "Get Users Failed" });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const user = await prisma.users.create({
      data: {
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        password: newUser.password,
      },
    });
    res.send({ message: "Create User Successfully", data: user });
  } catch {
    res.send({ message: "Create User Failed" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id; // type data params: string
    const updateData = req.body;
    const user = await prisma.users.update({
      where: {
        id: parseInt(userId), // changes to integer
      },
      data: {
        name: updateData.name,
        email: updateData.email,
        username: updateData.username,
        password: updateData.password,
      },
    });
    res.send({ message: "Update User Successfully", data: user });
  } catch {
    res.send({ message: "Failed Update User" });
  }
}

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // type data params: string
    await prisma.users.delete({
      where: {
        id: parseInt(userId), // changes to integer
      },
    });
    res.send({ message: "Delete User Successfully" });
  } catch {
    res.send({ message: "Failed Delete User" });
  }
};

module.exports = { getUsers, createUser, deleteUser, updateUser }