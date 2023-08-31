import { Request, Response } from "express";
import UserModel from "../models/user";
import { status } from "../loggers/constants";
import { User } from "../interfaces/userI";
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, role } = req.body;
    const user = new UserModel({ name, email, role });
    const savedUser = await user.save();
    return res.status(status.SUCCESS).json(savedUser);
  } catch (error) {
    return res.status(status.SERVER_ERROR).json({ message: "Failed to create user", error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {    
    const user = await UserModel.findById(req.params.id);
    return res.status(status.SUCCESS).json(user);
  } catch (error) {
    return res.status(status.SERVER_ERROR).json({ message: "Failed to get user by id", error });
  }
};