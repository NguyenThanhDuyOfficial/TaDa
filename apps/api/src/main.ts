import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

import { requestIdMiddleware } from '@api/middleware/requestId.middleware'
import { errorMiddleware } from '@api/middleware/error.middleware'

import { authRouter } from '@api/modules/auth'

export const createApp = () => {
  const app = express()

  // Security
  app.use(helmet())

  // CORS
  app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true
  }))

  // Request tracing
  app.use(requestIdMiddleware)

  // Body parsing
  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ extended: true }))

  // Routes
  app.get('/health', (_, res) => {
    res.status(200).json({ status: 'ok' })
  })

  app.use('/auth', authRouter)

  // Error handler (LAST)
  app.use(errorMiddleware)

  return app
}
