import express from 'express'
import multer from 'multer'
import AwsController from '../controllers/AwsController';

const upload = multer({ dest: 'uploads/' });
const awsRouter = express.Router()
const awsController = new AwsController()

awsRouter.get('/', awsController.getAllAttachmentByTimeline)
awsRouter.post('/', upload.array('files'), awsController.uploadAttachment)
awsRouter.delete('/:key', awsController.deleteAttachmentById)

export default awsRouter;
