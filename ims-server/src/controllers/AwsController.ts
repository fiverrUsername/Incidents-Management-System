import { Request, Response } from 'express';
import awsService from '../services/awsService';


export default class AwsController {

    async uploadAttachment(req: Request, res: Response): Promise<void> {
        try {
            console.log("--------------",typeof(req.files))
            const attachment = await awsService.uploadAttachment(req.files as Express.Multer.File[]);
            if(attachment instanceof Error){
                res.status(404).json({ message: attachment,error:true });
            }
            else res.status(200).json(attachment);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllAttachmentByTimelineId(req: Request, res: Response): Promise<void> {
        
    }

    async downloadAttachmentById(req: Request, res: Response): Promise<void> {
        
    }

    async deleteAttachmentById(req: Request, res: Response): Promise<void> {
        
    }

}
