const express = require('express');
const Transaction = require('../models/transaction');
const router = express.Router();

router.get('/', async (req, res) => {
    const {month, search, page = 1, perPage = 10, } = req.query;

    const query = {
        $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { price: { $regex: search, $options: 'i' } }
        ]
    };

    try {
        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(parseInt(perPage));
        const totalTransactions = await Transaction.countDocuments(query);

        res.json({
            transactions,
            totalTransactions,
            totalPages: Math.ceil(totalTransactions / perPage),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching transactions' });
    }
});

module.exports = router;

