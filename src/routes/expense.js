const express = require("express");

const router = express.Router();

const Expense = require("../models/expense");

router.get('/expenses', async (req,res) => {
   try {
         const expenses = await Expense.find().populate("category");
         res.json(expenses);
   } catch (error) {
        console.error(error);
        res.status(500).send("erreur lors de la récuperation des données");
   }
});

router.get('/expense/:id', async (req,res) => {
    try {
        const id = req.params.id;
        if(!await Expense.findById(id)) {
            return res.status(404).send("la donnée n'esxiste pas dans la base de donnée")
        }

        const expense = await Expense.findById(id).populate('category');
        res.json(expense);
    } catch (error) {
        console.error(error);
        res.status(500).send("erreur lors de la récuperation des données");
    }
})

router.post('/expense', async (req,res) => {
    try {
        const expense = new Expense(req.body)
        expense.save();

        const data = {
          message: "Donnée crée",
          expense,
        };

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("erreur lors de l'enregiqtrement des données")
    }
})

router.put('/expense/:id', async (req,res) => {
    try {
        const id = req.params.id
        if(!await Expense.findById(id)) {
            return res.status(404).send("la donnée n'esxiste pas dans la base de donnée");
        }

        const expense = await Expense.findByIdAndUpdate(id,req.body)
        const data = {
            message: "Donnée mise à jour",
            expense
        }
        res.json(data);
    } catch (error) {
       console.error(error);
        res.status(500).send("erreur lors de la mise à jour des données");
    }
});

router.delete('/expense/:id', async (req,res) => {
    try {
        const id = req.params.id;
        if(!await Expense.findById(id)) {
            return res.status(404).send("la donnée n'esxiste pas dans la base de donnée");
        }

        await Expense.findByIdAndDelete(id);
        res.json({ message: 'les données ont été supprimées' });
    } catch (error) {
        console.error(error);
        res.status(500).send("erreur lors de la suppression des données");
    }
})

module.exports = router