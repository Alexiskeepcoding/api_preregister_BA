import express from "express";
import dotenv from "dotenv";
import organization from "./routes/organization.routes";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import swaggerUi from 'swagger-ui-express';
import specs from "./swagger/swagger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/organization", organization);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on: http://localhost:${PORT}`);
  console.log(`Docs📃 started on: http://localhost:${PORT}/api-docs`);
});
