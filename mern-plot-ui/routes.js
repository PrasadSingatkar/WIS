const express = require('express');
const Data = require('./db');
const axios = require('axios');

const router = express.Router();

router.get('/getData', async (req, res) => {
    try {
        const { startTime, frequency } = req.query;
        let endTime;
        switch (frequency) {
            case 'hour':
                endTime = new Date(new Date(startTime).setHours(new Date(startTime).getHours() + 1));
                break;
            case 'day':
                endTime = new Date(new Date(startTime).setDate(new Date(startTime).getDate() + 1));
                break;
            case 'week':
                endTime = new Date(new Date(startTime).setDate(new Date(startTime).getDate() + 7));
                break;
            case 'month':
                endTime = new Date(new Date(startTime).setMonth(new Date(startTime).getMonth() + 1));
                break;
            default:
                res.status(400).json({ msg: 'Invalid frequency' });
                return;
        }
        const data = await Data.find({ timestamp: { $gte: startTime, $lt: endTime } });
        res.json(data);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

router.get('/getTemperature', async (req, res) => {
    try {
        const { location } = req.query;
        const response = await axios.get(`API_URL_HERE?q=${location}&units=metric&appid=YOUR_API_KEY`);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;
