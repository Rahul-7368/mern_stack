const express = require('express');
const Transaction = require('../models/transaction');
const router = express.Router();

router.get('/', async (req, res) => {
    const { month } = req.query;
    const startDate = new Date(`2025-${month}-01`);
    const endDate = new Date(`2025-${month}-31`);

    const priceRanges = [
        { min: 0, max: 100 },
        { min: 101, max: 200 },
        { min: 201, max: 300 },
        { min: 301, max: 400 },
        { min: 401, max: 500 },
        { min: 501, max: 600 },
        { min: 601, max: 700 },
        { min: 701, max: 800 },
        { min: 801, max: 900 },
        { min: 901, max: Infinity }
    ];

    try {
        const result = await Promise.all(
            priceRanges.map(async (range) => {
                const count = await Transaction.countDocuments({
                    price: { $gte: range.min, $lte: range.max },
                    dateOfSale: { $gte: startDate, $lte: endDate }
                });
                return { range: `${range.min}-${range.max}`, count };
            })
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching bar chart data' });
    }
});

module.exports = router;
