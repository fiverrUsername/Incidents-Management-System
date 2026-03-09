import express, { Router } from 'express'
import multer from 'multer'
import AwsController from '../controllers/attachmentController';

const upload: multer.Multer = multer({ dest: 'uploads/' });
const attachmentsRouter: Router = express.Router()
const attachmentsController: AwsController = new AwsController()

attachmentsRouter.post('/', upload.array('files'), attachmentsController.uploadAttachment)
attachmentsRouter.delete('/', attachmentsController.deleteAttachmentById)
attachmentsRouter.post('/allSingUrl', attachmentsController.getSignedUrlForKeys)

export default attachmentsRouter;