const express = require('express')
const ejs = require('ejs')

const app = express()

app.use(express.static('public'))

// set 'html' as the engine, using ejs's renderFile function
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

app.get('/', (request, response) => {
  response.render('index')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
