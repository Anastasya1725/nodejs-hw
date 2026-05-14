import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import  notesRoutes  from './routes/notesRoutes.js';
import { errors } from 'celebrate';



const app = express();


app.use(
  cors({
    methods: ["GET", "POST", "PATCH", "DELETE"],
    origin: "*",
  }),
);
app.use(helmet());


app.use(express.json());
app.use(logger);

app.use(notesRoutes);
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);


await connectMongoDB();


const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
