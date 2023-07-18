import express from 'express'

import aggregation from '../controllers/AggregateController'

const aggregationRouter = express.Router()
const aggregationController = new aggregation()

aggregationRouter.get('/', aggregationController.incidentAggregation)
export default aggregationRouter
