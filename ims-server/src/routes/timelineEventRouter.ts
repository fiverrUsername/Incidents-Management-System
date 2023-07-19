import express from 'express'

import TimelineEventController from '../controllers/TimelineEventController'

const router = express.Router()
const timelineEventController = new TimelineEventController()

router.get('/', timelineEventController.getAllTimelineEvents)
router.get('/:id', timelineEventController.getTimelineEventById)
router.post('/', timelineEventController.addTimelineEvent)
router.put('/:id', timelineEventController.updateTimelineEvent)
router.delete('/:id',timelineEventController.deleteTimelineEvent)

export default router;