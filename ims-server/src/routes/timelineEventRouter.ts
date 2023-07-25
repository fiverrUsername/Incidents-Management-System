import express from "express";

import TimelineEventController from "../controllers/TimelineEventController";

const router = express.Router();
const timelineEventController = new TimelineEventController();

router.get("/", timelineEventController.getAllTimelineEvents);
router.post("/", timelineEventController.addTimelineEvent);
router.post("/compareIncidentChanges", timelineEventController.compareIncidentChanges);
router.delete("/:id", timelineEventController.deleteTimelineEvent);
router.get('/', timelineEventController.getAllTimelineEvents);
router.get('/getById/:id', timelineEventController.getTimelineEventsById);
router.get('/getFile/:id', timelineEventController.getFileInTimelineEventByIndex)
router.delete('/deleteFile/:id', timelineEventController.deleteFileInTimelineEventByIndex)
router.put('/updateTimeLineEvent/:id', timelineEventController.updateTimelineEvent);
export default router;
