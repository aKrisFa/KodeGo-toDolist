const express = require("express");
const app = express();
const cors = require('cors');
const router = require('./todoRoute.js');

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use("/task", router);

app.listen(3000, () => {
    console.log("Server running");
});
