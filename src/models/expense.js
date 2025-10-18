const mongoose = require("mongoose");
const dayjs = require("dayjs");

//model pour les depenses

const ExpenseSChema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      get: (date) => dayjs(date).format("D MMM, HH:mm"),
    },
  },
  {
    toJSON: { getters: true },
    toObject: { getters: true }
  }
);

const Expense = mongoose.model("Expense",ExpenseSChema);
module.exports = Expense;