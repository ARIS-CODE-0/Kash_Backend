const express = require("express");

const router = express.Router();

const Category = require("../models/category");

router.get('/categories', async (req,res) => {
    try {
        const categories = await Category.find();
        
        res.json(categories)
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
});

router.get('/category/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if(!await Category.findById(id)) return res.status(404).send("aucune categorie n'a été trouvée avec cet ID");


        const category = await Category.findById(id);
        
        res.json(category)
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
});

router.post('/category', async (req, res) => {
    try {
        const category = new Category(req.body);
        category.save();
        const data = {
            message: "Donnée crée",
            category
        }
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
});

router.put('/category/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if (!(await Category.findById(id))) return res.status(404).send("aucune categorie n'a été trouvée avec cet ID");

    await Category.findByIdAndUpdate(id, req.body);
    const category = await Category.findById(id);
    const data = {
      message: "Donnée mise à jour",
      category
    }

    res.json(data);
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
});

router.delete('/category/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if (!(await Category.findById(id))) return res.status(404).send("aucune categorie n'a été trouvée avec cet ID");

        await Category.findByIdAndDelete(id)

        res.json({ message: "Donnée supprimée" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
});


module.exports = router