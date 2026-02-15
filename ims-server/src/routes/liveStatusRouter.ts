import express from "express";
import liveStatusController from "../controllers/liveStatusController";

const router: express.Router = express.Router();
const liveStatus: liveStatusController = new liveStatusController();

router.get("/", liveStatus.getLiveStatus);

export default router;