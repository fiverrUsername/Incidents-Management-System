import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import config from '../config/config'
import logger from '../loggers/log';

dotenv.config();

const connect = () => {
    mongoose.connect(config.mongo.url?config.mongo.url:"", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxTimeMS: 30000,
    } as ConnectOptions)
    .then(() => {
        logger.info('Connected to MongoDB');
    })
    .catch(error => {
        logger.error('Unable to connect to MongoDB.', error);
    });
};

const disconnect = () => {
    mongoose.disconnect()
    .then(() => {
        logger.info('Disconnected from MongoDB');
    })
    .catch(error => {
        logger.error('Failed to disconnect from MongoDB', error);
        throw error;
    });
};

export { connect, disconnect };
