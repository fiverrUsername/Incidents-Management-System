<<<<<<< HEAD
import express from 'express'

import IncidenceController from '../controllers/IncidentController'
=======
import express from 'express';
import IncidenceController from '../controllers/IncidentControler';
>>>>>>> origin

const router = express.Router();
const incidenceController = new IncidenceController();

router.get('/', incidenceController.getAllIncidents);
router.get('/:id', incidenceController.getIncidentById);
<<<<<<< HEAD
router.post('/addIncident', incidenceController.addIncident);
router.put('/updateIncident/:id', incidenceController.updateIncident);
router.get('/summary/:id',incidenceController.getSummaryIncident);
export default router;
=======
router.post('/', incidenceController.addIncident);
router.put('/:id', incidenceController.updateIncidence);

export default router;
>>>>>>> origin
