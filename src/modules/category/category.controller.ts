import { Request, Response } from "express";
import { createApiResponse } from "../../utils/apiResponse";
import { CategoryService } from "./category.service";

const createCategory = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.createCategory(req.body);
    const response = createApiResponse(
      200,
      "Category created successfully",
      result
    );
    res.send(response);
  } catch (error) {
    res.send(error);
  }
};

export const CategoryController = {
  createCategory,
};
