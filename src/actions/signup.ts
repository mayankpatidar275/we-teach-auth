"use server";

import { connectToDatabase } from "@/lib/utils";
import { User } from "@/models/userModel";
const bcrypt = require("bcrypt");

const credentialsSignup = async (
  name: String,
  email: String,
  password: String
) => {
  try {
    await connectToDatabase();
  } catch (error) {
    throw Error("Something went wrong");
  }

  const user = await User.findOne({ email });
  if (user) throw Error("User already exists");

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    // redirect("/login");      // redirect can not be use in try catch because it internally throws an error
  } catch (error) {
    // console.log("Something went wrong:", error);
    throw Error("Something went wrong");
  }
};

export { credentialsSignup };
