import express from 'express'
import IncidenceController from '../controllers/IncidentController'
import aggregateIncident from '../aggregations/incidentAggregation'

const router = express.Router()
const incidenceController = new IncidenceController()

router.get('/', incidenceController.getAllIncidents)
router.get('/:id', incidenceController.getIncidentById)
router.get('getAggrigation', aggregateIncident)
router.post('/addIncident', incidenceController.addIncident)
router.put('/updateIncident/:id', incidenceController.updateIncident)

export default router;