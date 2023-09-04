import express from "express";
import liveStatusController from "../controllers/liveStatusController";

const router = express.Router();
const liveStatus = new liveStatusController();

router.get("/", liveStatus.getLiveStatus);

export default router;