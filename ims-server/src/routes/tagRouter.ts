import express from "express";
import TagController from "../controllers/tagController";

const router = express.Router();
const tagController = new TagController();

router.post("/", tagController.addTag);
router.get("/", tagController.getAllTags);

export default router;
