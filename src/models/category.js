// model pour les catégories
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icone: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const Category = new mongoose.model("Category", categorySchema);
module.exports = Category;
