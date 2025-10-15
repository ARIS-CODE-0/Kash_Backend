const express = require("express");

const router = new express.Router();

const Expense = require("../models/expense")

router.get('/expenses', async (req,res) => {
   try {
         const expenses = await Expense.find()
         res.json(expenses)
   } catch (error) {
        console.error(error);
        res.status(500).send("erreur lors de la récuperation des données");
   }
});

router.get('/expense/:id', async (req,res) => {
    try {
        const id = req.params.id;
        if(!await Expense.findById(id)) {
            return res.status(400).send("la donnée n'esxiste pas dans la base de donnée")
        }

        const expense = await Expense.findById(id);
        res.json(expense)
    } catch (error) {
        console.error(error);
        res.status(500).send("erreur lors de la récuperation des données");
    }
})

router.post('/expense', async (req,res) => {
    try {
        const expense = new Expense(req.body)
        expense.save();
        res.json(expense)
    } catch (error) {
        console.error(error);
        res.status(500).send("erreur lors de l'enregiqtrement des données")
    }
})

router.put('/expense/:id', async (req,res) => {
    try {
        const id = req.params.id
        if(!await Expense.findById(id)) {
            return res.status(400).send("la donnée n'esxiste pas dans la base de donnée")
        }

        const expense = await Expense.findByIdAndUpdate(id,req.body)
        res.send("donnée mise à jour");
    } catch (error) {
       console.error(error);
        res.status(500).send("erreur lors de la mise à jour des données") 
    }
});

router.delete('/expense/:id', async (req,res) => {
    try {
        const id = req.params.id;
        if(!await Expense.findById(id)) {
            return res.status(400).send("la donnée n'esxiste pas dans la base de donnée")
        }

        await Expense.findByIdAndDelete(id);
        res.send('les données ont été supprimées')
    } catch (error) {
        console.error(error);
        res.status(500).send("erreur lors de la suppression des données") 
    }
})

module.exports = router