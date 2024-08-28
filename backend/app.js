const express = require('express')
const app = express()
const employeeRouter = require("./routes/employeeRoutes")

// Middleware to parse JSON request bodies
app.use(express.json());

app.use('/api/employees', employeeRouter);

module.exports = app;