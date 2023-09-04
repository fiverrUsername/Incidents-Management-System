import express from 'express'
import multer from 'multer'
import AwsController from '../controllers/attachmentController';

const upload = multer({ dest: 'uploads/' });
const attachmentsRouter = express.Router()
const attachmentsController = new AwsController()

attachmentsRouter.post('/', upload.array('files'), attachmentsController.uploadAttachment)
attachmentsRouter.delete('/', attachmentsController.deleteAttachmentById)
attachmentsRouter.post('/allSingUrl', attachmentsController.getSignedUrlForKeys)

export default attachmentsRouter;