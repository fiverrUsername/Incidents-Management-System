import express from 'express'
import multer from 'multer'
import attachmentController from '../controllers/attachmentController';

const upload = multer({ dest: 'uploads/' });
const attachmentsRouter = express.Router()
const attachmentsController = new attachmentController()

attachmentsRouter.post('/allAttachments', attachmentsController.getAllAttachmentByTimeline)
attachmentsRouter.post('/', upload.array('files'), attachmentsController.uploadAttachment)
attachmentsRouter.delete('/', attachmentsController.deleteAttachmentById)

export default attachmentsRouter;