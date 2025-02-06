const express = require('express');
const Transaction = require('../models/transaction');
const router = express.Router();

router.get('/', async (req, res) => {
    const { month } = req.query;
    const startDate = new Date(`2025-${month}-01`);
    const endDate = new Date(`2025-${month}-31`);

    try {
        const categories = await Transaction.aggregate([
            { $match: { dateOfSale: { $gte: startDate, $lte: endDate } } },
            { $group: { _id: '$category', count: { $sum: 1 } } }
        ]);

        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching pie chart data' });
    }
});

module.exports = router;
