import express, { Router } from "express";

import aggregation from "../controllers/AggregateController";

const aggregationRouter: Router = express.Router();
const aggregationController: aggregation = new aggregation();

aggregationRouter.get("/", aggregationController.incidentAggregation);
export default aggregationRouter;
