const express = require("express");
const morgan = require("morgan");

const Expense = require("./src/models/expense")
const expenseRoute = require("./src/routes/expense")

const { connectDB } = require("./src/config/db")

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json())
app.use(expenseRoute)

connectDB()

app.get('/',(req,res) => {
    res.send('Kash is online');
});



app.listen(port, () => {
    console.log(`server is run on http://localhost:${port}`);
});