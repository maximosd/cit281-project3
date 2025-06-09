const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
app.use(express.static('public/index.html'));

const { coinValue, coinCombo } = require('./p3-module.js');

//getValue route
//converts the amount request query parameter into a number
//returns a JSON object with an error property if the amount is not a number of is less than 0 
//returns the result of the coinCombo() imported function as JSON
app.get('/coinValue/:coinCounts', (req,res) => {
    const amount = parseFloat(req.params.amount);
    if (isNaN(amount) || amount < 0) {
        return res.status(400).json({ error: 'Invalid amount' });
    }
    const result = coinValue(amount);
    res.json(result);
})

//coinCombo route
//extracts each of the US coinage request query parameters for pennies, nickels, dimes, quarters, halves, and dollars, and converts to an integer, or defaults to 0 
//returns the result of the coinValue() imported function as JSON
app.get('/coinCombo/:coinCombo', (req,res) => {
    const { pennies, nickels, dimes, quarters, halves, dollars } = req.query;
    const coinCounts = {
        pennies: parseInt(pennies) || 0,
        nickels: parseInt(nickels) || 0,
        dimes: parseInt(dimes) || 0,
        quarters: parseInt(quarters) || 0,
        halves: parseInt(halves) || 0,
        dollars: parseInt(dollars) || 0
    };
    const result = coinCombo(coinCounts);
    res.json(result);
});

//404 route handler
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });