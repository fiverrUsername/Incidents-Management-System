import express from "express";
import SystemStatusController from "../controllers/systemStatusController";

const router = express.Router();
const systemStatusControllers = new SystemStatusController();

//remove after test
router.get("/", systemStatusControllers.getLatestLiveStatus);
router.post("/", systemStatusControllers.createLiveStatus);
//router.put("/", systemStatusControllers.updateLiveStatus);

//return to client
[{inbox:[]},{checkout:[]}]

export default router;
