import express from 'express';
import ServicesS3 from '../aws_s3/ServicesS3';

const awsRouter = express.Router();

awsRouter.get('/', async (req, res) => {
  try {
    const file = await ServicesS3.showFileFromS3('ims-fiverr', 'technical_interviews_preparation_-_week_2__1_.docx');
      if (file) {
          res.send(file.toString());
      } else {
          res.status(404).send('File not found');
      }
  } catch (error) {
    console.error('Error retrieving file:', error);
    res.status(500).send('Error retrieving file');
  }
});

export default awsRouter;