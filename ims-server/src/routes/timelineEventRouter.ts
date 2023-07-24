import express from "express";

import TimelineEventController from "../controllers/TimelineEventController";

const router = express.Router();
const timelineEventController = new TimelineEventController();

router.get("/", timelineEventController.getAllTimelineEvents);
router.post("/", timelineEventController.addTimelineEvent);
router.delete("/:id", timelineEventController.deleteTimelineEvent);
router.get('/', timelineEventController.getAllTimelineEvents);
router.get('/getById/:id', timelineEventController.getTimelineEventsById);
router.get('/getFile/:id', timelineEventController.getFileInTimelineEventByIndex)
router.delete('/deleteFile/:id', timelineEventController.deleteFileInTimelineEventByIndex)

export default router;
