import express, { Router } from "express";
import { createUser } from "../controllers/userControler";
const router: Router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/createuser", createUser);
export default router;
