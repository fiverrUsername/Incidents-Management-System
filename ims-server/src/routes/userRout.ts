import express from "express";
import { createUser } from "../controllers/userControler";
const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/createuser", createUser);
export default router;
