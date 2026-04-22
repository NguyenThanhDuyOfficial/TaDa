import express from 'express'
import cors from "cors";


// Import routes
import authRoute from './routes/auth.route'
import { requestIdMiddleware } from './middleware/requestId.middleware';
import { errorMiddleware } from './middleware/error.middleware';

const app = express()
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(requestIdMiddleware)

// Body Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoute)
app.use(errorMiddleware)
const port = Number(process.env.PORT) || 5001
app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})

export default app
