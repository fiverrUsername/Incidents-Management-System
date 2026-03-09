import express, { Router } from "express";
import TagController from "../controllers/tagController";

const router: Router = express.Router();
const tagController: TagController = new TagController();

router.post("/", tagController.addTag);
router.get("/", tagController.getAllTags);

export default router;
