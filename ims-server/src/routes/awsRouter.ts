import express from 'express'
import multer from 'multer'
import AwsController from '../controllers/AwsController';

const upload = multer({ dest: 'uploads/' });
const awsRouter = express.Router()
const awsController = new AwsController()

awsRouter.post('/allAttachments', awsController.getAllAttachmentByTimeline)
awsRouter.post('/', upload.array('files'), awsController.uploadAttachment)
awsRouter.delete('/', awsController.deleteAttachmentById)

export default awsRouter;
