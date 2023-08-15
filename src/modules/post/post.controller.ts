import { Request, Response } from "express";
import { createApiResponse } from "../../utils/apiResponse";
import { PostService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await PostService.createPost(req.body);

    const response = createApiResponse(200, "Post Created Successful", result);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
};

const getAllPost = async (req: Request, res: Response) => {
  try {
    const options = req.query;
    const result = await PostService.getAllPost(options);

    const response = createApiResponse(
      200,
      "Posts Retrieved Successful",
      result.data,
      result.total
    );
    res.send(response);
  } catch (error) {
    res.send(error);
  }
};

const getSinglePost = async (req: Request, res: Response) => {
  try {
    const result = await PostService.getSinglePost(parseInt(req.params.id));
    const response = createApiResponse(
      200,
      "Post Retrieved Successful",
      result
    );
    res.send(response);
  } catch (error) {
    res.send(error);
  }
};
const updatePost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const payload = req.body;
    const result = await PostService.updatePost(id, payload);
    const response = createApiResponse(200, "Post updated Successful", result);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
};
const deletePost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const result = await PostService.deletePost(id);
    const response = createApiResponse(200, "Post deleted Successful", result);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
};

export const PostController = {
  createPost,
  getAllPost,
  getSinglePost,
  updatePost,
  deletePost,
};
