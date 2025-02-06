const express = require('express');
const Transaction = require('../models/transaction');
const router = express.Router();

router.get('/', async (req, res) => {
    const { month } = req.query;
    const startDate = new Date(`2025-${month}-01`);
    const endDate = new Date(`2025-${month}-31`);

    try {
        const soldItems = await Transaction.aggregate([
            { $match: { dateOfSale: { $gte: startDate, $lte: endDate }, sold: true } },
            { $group: { _id: null, totalSales: { $sum: '$price' }, totalSold: { $sum: 1 } } }
        ]);

        const notSoldItems = await Transaction.aggregate([
            { $match: { dateOfSale: { $gte: startDate, $lte: endDate }, sold: false } },
            { $group: { _id: null, totalNotSold: { $sum: 1 } } }
        ]);

        res.json({
            totalSales: soldItems[0]?.totalSales || 0,
            totalSold: soldItems[0]?.totalSold || 0,
            totalNotSold: notSoldItems[0]?.totalNotSold || 0
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching statistics' });
    }
});

module.exports = router;
