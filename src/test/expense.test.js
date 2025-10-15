const Expense = require("../models/expense")
const { connectDB } =  require("../config/db")
require("dotenv").config({ path: __dirname + '/../../.env'})

async function run() {
    try {
        console.log(`(run) ${process.env.MONGO_URI}`)
        await connectDB()
        const expense = new Expense({
            title: "Jordan 1",
            amount: 30,
            category: "shoes"
        });

        await expense.save();

        console.log(expense)
    } catch (error) {
        console.error(error)
    }
}

async function get() {
    await connectDB()
    const expenses = await Expense.find()
    console.log(expenses)
}

get()
//run()