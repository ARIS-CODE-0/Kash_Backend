const mongoose = require("mongoose");

//model pour les depenses

const ExpenseSChema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Expense = mongoose.model("Expense",ExpenseSChema);
module.exports = Expense;