const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Expense = require("./src/models/expense");
const expenseRoute = require("./src/routes/expense");
const categoryRoute = require("./src/routes/category");

const { connectDB } = require("./src/config/db");

const app = express();
const port = process.env.PORT || 3000;
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173", // Vite par exemple
  "https://votre-frontend-production.com",
];


app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(expenseRoute);
app.use(categoryRoute);

connectDB()

app.get('/',(req,res) => {
    res.send('Kash is online');
});



app.listen(port, '0.0.0.0', () => {
    console.log(`server is run on http://localhost:${port}`);
});