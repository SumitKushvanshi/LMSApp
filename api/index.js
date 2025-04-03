const express = require('express');
const mongoose = require('mongoose');
const nodemon = require('nodemon');
// const dotenv=require('dot-env');
const cors = require('cors');
const bodyParser = require('body-parser');




const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(process.dotenv)
const PORT = 3000;
const PASSWORD = 'mongodb+srv://sumitkushwaha63078:sumit@cluster0.0qgml.mongodb.net/';



mongoose.connect(PASSWORD).then(() => {
    console.log("Database is connect")
}).catch(err => {
    console.log("Error is ", err)
})







app.listen(PORT, () => {
    console.log(`server is running is port ${PORT}`)
})

const Expense = require("./models/expense")

app.post('\expenses', async (req, res) => {
    try {
        const { type, account, category, note, date, ammount, day } = req.body;
        const newExpense = new Expense({
            type,
            account,
            category,
            ammount,
            day,
            note,
            date,
           

        })
        await newExpense.save()
        res.status(201).json({ message: 'Respose Save Sucesfully', expense: newExpense })

    } catch (error) {
        console.log("Error", error)
        return res.stauts(500).json({ message: 'Interal Sever Error' })

    }
})

app.get("/expense", async (req, res) => {
    try {
        const { date } = req.query
        const expense = await Expense.find({ date: date })
        res.status(200).json(expense)
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ message: "Error getting all expenses" })

    }
})

