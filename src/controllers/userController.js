const prisma = require("../config/database");
const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const length = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, length);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Failed to hash password");
  }
};

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

    const emailExist = await prisma.users.findUnique({
      where: {
        email: newUser.email,
      },
    });

    if(emailExist) {
      return res.send({ message: "Email already exist" });
    }

    const usernameExist = await prisma.users.findUnique({
      where: {
        username: newUser.username,
      },
    });

    if(usernameExist) {
      return res.send({ message: "Username already exist" });
    }

    const user = await prisma.users.create({
      data: {
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        password: await hashPassword(newUser.password),
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

    const usernameExist = await prisma.users.findUnique({
      where: {
        username: updateData.username,
      },
    });

    if (usernameExist) {
      return res.send({ message: "Update Failed! Username Already Exist" });
    }

    const emailExist = await prisma.users.findUnique({
      where: {
        email: updateData.email,
      },
    });

    if (emailExist) {
      return res.send({ message: "Update Failed! Email Already Exist" });
    }

    const user = await prisma.users.update({
      where: {
        id: parseInt(userId), // changes to integer
      },
      data: {
        name: updateData.name,
        email: updateData.email,
        username: updateData.username,
        password: await hashPassword(updateData.password),
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
    res.send({ message: `Delete User ID: ${userId} Successfully` });
  } catch {
    res.send({ message: "Failed Delete User" });
  }
};

module.exports = { getUsers, createUser, deleteUser, updateUser }