import express from 'express'

// Import routes
import authRoute from './routes/auth.route.ts'

const app = express()


// Body Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoute)

const port = Number(process.env.PORT) || 5001
app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})

export default app
