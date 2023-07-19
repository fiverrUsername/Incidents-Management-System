import express from 'express'

import IncidenceController from '../controllers/IncidentController'

const router = express.Router()
const incidenceController = new IncidenceController()

router.get('/', incidenceController.getAllIncidents);
router.get('/:id', incidenceController.getIncidentById);
router.post('/addIncident', incidenceController.addIncident);
router.put('/updateIncident/:id', incidenceController.updateIncident);
router.get('/summary',incidenceController.getSummaryIncident);
export default router;