import express from "express";
import SystemStatusController from "../controllers/systemStatusController";

const router = express.Router();
const systemStatusControllers = new SystemStatusController();

router.post("/", systemStatusControllers.createLiveStatus);
export default router;
