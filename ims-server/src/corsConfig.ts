import cors from 'cors';

const whitelist = ['http://localhost:3000', 'http://localhost:4700', 'http://localhost:7071', 'http://localhost:7000'];

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (origin === undefined || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: 'POST,GET,PUT,OPTIONS,DELETE'
};
