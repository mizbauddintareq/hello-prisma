import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/create-user", UserController.createUser);
router.post("/profile", UserController.createOrUpdateProfile);
router.get("/", UserController.getAllUser);
router.get("/:id", UserController.getSingleUser);

export const UserRoutes = router;
