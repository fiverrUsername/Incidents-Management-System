import express from "express";
import SystemStatusController from "../controllers/systemStatusController";

const router = express.Router();
const systemStatusControllers = new SystemStatusController();

router.get("/", systemStatusControllers.getSystemsByDate);
router.post("/", systemStatusControllers.createLiveStatus);
router.put("/", systemStatusControllers.updateLiveStatus);
export default router;
