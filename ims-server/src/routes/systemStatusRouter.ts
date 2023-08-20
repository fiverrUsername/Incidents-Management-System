import express from "express";
import systemStatusController from "../controllers/systemStatusController";

const router = express.Router();
const systemStatus = new systemStatusController();

router.get("/", systemStatus.getLatestLiveStatus);
//testing
router.post("/", systemStatus.createLiveStatus);

export default router;