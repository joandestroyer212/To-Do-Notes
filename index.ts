import express, { json } from 'express';
import userRoutes from "./routes/user.routes";
import cors from "cors";
import todoListRoutes from './routes/todo-list.routes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors())

app.use(userRoutes);
app.use(todoListRoutes)

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
