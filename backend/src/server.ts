import express from 'express'

const app = express()


// Body Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('hello')
})

const port = Number(process.env.PORT) || 3000
app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})

export default app
