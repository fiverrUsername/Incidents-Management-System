import express from "express";

import TimelineEventController from "../controllers/TimelineEventController";

const router = express.Router();
const timelineEventController = new TimelineEventController();

router.get("/", timelineEventController.getAllTimelineEvents);
router.post("/", timelineEventController.addTimelineEvent);
router.post("/compareIncidentChanges", timelineEventController.compareIncidentChanges);
router.delete("/:id", timelineEventController.deleteTimelineEvent);
router.get('/:id/', timelineEventController.getTimelineEventById);
router.get('/:id/files/', timelineEventController.getFileInTimelineEventByIndex);
router.delete('/:id/files', timelineEventController.deleteFileInTimelineEventByIndex);
router.put('/updateTimeLineEvent/:id', timelineEventController.updateTimelineEvent);

export default router;
