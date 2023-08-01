import express from 'express'
import multer from 'multer'
import AttachmentController from '../controllers/attachmentController';

const upload = multer({ dest: 'uploads/' });
const attachmentsRouter = express.Router()
const attachmentsController = new AttachmentController()

attachmentsRouter.post('/allAttachments', attachmentsController.getAllAttachmentByTimeline)
attachmentsRouter.post('/', upload.array('files'), attachmentsController.uploadAttachment)
attachmentsRouter.delete('/', attachmentsController.deleteAttachmentById)

export default attachmentsRouter;