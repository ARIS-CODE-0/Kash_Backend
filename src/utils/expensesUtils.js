const Expense = require("../models/expense");
const Category = require("../models/category")

function getTotal(expenses) {
    let total = 0
    expenses.forEach( expense  => {
        total = total + expense.amount
    });
    
    return total
}

async function getExpensesOfCategory(categoriesId) {
    const expenses = await Expense.find({ category :categoriesId });
    
    return expenses
}

async function getExpensesOfAllCategories(categories) {
    const promises = categories.map(async (category) => {
        const expenses = await Expense.find({ category: category._id });
        return {
          category: category.name,
          expenses,
          total: expenses.reduce((sum, e) => sum + e.amount, 0),
          color: category.color
        };
    })
    const results = await Promise.all(promises);

    //const des tableau de données
    const categoriesNames = results.map(r => r.category);
    const totals = results.map(r => r.total);
    const colors = results.map(r => r.color)

    
    return {
        categories: categoriesNames,
        totals,
        colors
    };
}

module.exports = { getTotal, getExpensesOfCategory, getExpensesOfAllCategories };