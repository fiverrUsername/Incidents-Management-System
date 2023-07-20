import express from 'express'
import multer from 'multer'
import AwsController from '../controllers/awsController';

const upload = multer({ dest: 'uploads/' });
const awsRouter = express.Router()
const awsController = new AwsController()

awsRouter.get('/', awsController.getAllAttachmentByTimelineId)
awsRouter.get('/:key', awsController.downloadAttachmentById)
awsRouter.post('/', upload.array('files'), awsController.uploadAttachment)
awsRouter.delete('/:key', awsController.deleteAttachmentById)

export default awsRouter;
