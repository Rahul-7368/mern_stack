const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    const { month } = req.query;

    try {
        const statistics = await axios.get(`/api/statistics?month=${month}`);
        const barChart = await axios.get(`/api/bar-chart?month=${month}`);
        const pieChart = await axios.get(`/api/pie-chart?month=${month}`);

        res.json({
            statistics: statistics.data,
            barChart: barChart.data,
            pieChart: pieChart.data
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching combined data' });
    }
});

module.exports = router;
