import express, { Router } from "express";

import IncidenceController from "../controllers/IncidentController";

const router: Router = express.Router();
const incidenceController: IncidenceController = new IncidenceController();

router.get('/', incidenceController.getAllIncidents);
router.get('/:fieldvalue/:fieldname?', incidenceController.getIncidentByField);
router.post('/addIncident', incidenceController.addIncident);
router.put('/updateIncident/:id', incidenceController.updateIncident);
router.get('/result/summary/:id', incidenceController.getSummaryIncident);
export default router;