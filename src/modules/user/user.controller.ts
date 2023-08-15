import { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.createUser(req.body);
    res.send({
      status: 200,
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};
const createOrUpdateProfile = async (req: Request, res: Response) => {
  try {
    const result = await UserService.createOrUpdateProfile(req.body);
    res.send({
      status: 200,
      success: true,
      message: "Profile created/updated successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUser();

    res.send({
      status: 200,
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getSingleUser(parseInt(req.params.id));

    res.send({
      status: 200,
      success: true,
      message: "User retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const UserController = {
  createUser,
  createOrUpdateProfile,
  getAllUser,
  getSingleUser,
};
