import express from "express";
import SystemStatusController from "../controllers/systemStatusController";

const router = express.Router();
const systemStatusController = new SystemStatusController();

router.get("/", systemStatusController.getLiveStatusSystemsByDate);
router.post("/", systemStatusController.createLiveStatus);
router.put("/", systemStatusController.updateLiveStatus);
export default router;
