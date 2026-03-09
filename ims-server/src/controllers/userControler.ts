import { Request, Response } from "express";
import UserModel from "../models/user";
import { STATUS } from "../loggers/constants";
import { User } from "../interfaces/userI";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, role } = req.body;
    const user= new UserModel({ name, email, role });
    const savedUser: User = await user.save();
    return res.status(STATUS.SUCCESS).json(savedUser);
  } catch (error) {
    return res.status(STATUS.SERVER_ERROR).json({ message: "Failed to create user", error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user: User | null = await UserModel.findById(req.params.id);
    return res.status(STATUS.SUCCESS).json(user);
  } catch (error) {
    return res.status(STATUS.SERVER_ERROR).json({ message: "Failed to get user by id", error });
  }
};