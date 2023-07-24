const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
require('./entities/index')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const  customerRoutes = require('./routes/customerRoutes')
app.use('/Customer', customerRoutes);

const  supplierRoutes = require('./routes/supplierRoutes')
app.use('/supplier', supplierRoutes);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })