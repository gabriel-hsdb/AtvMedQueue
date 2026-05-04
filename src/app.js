const express = require("express");
const app = express();

app.use(express.json());
app.use("/patients", require("./routes/patientRoutes"));
app.use("/queue", require("./routes/queueRoutes"));

module.exports = app;