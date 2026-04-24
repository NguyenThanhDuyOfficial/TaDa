import { createApp } from '@api/main'

const app = createApp()
const port = Number(process.env.PORT) || 5001

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})
