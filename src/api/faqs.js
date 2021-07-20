const express = require('express');
const monk = require('monk');
const Joi = require('@hapi/joi');

const db = monk(process.env.MONGO_URI);
const faqs = db.get('faqs');

// Schema to validate the incoming data 
const schema = Joi.object({
    question: Joi.string().trim().required(),
    answer: Joi.string().trim().required(),
    video_url: Joi.string().uri(),
});

const router = express.Router();

// READ all
router.get('/', async (req, res, next) => {
    try {
        const items = await faqs.find({})
        res.json(items);
    } catch (error) {
        next(error);
    }
});

// READ One
router.get('/:id', (req, res, next) => {
    res.json({
        message: 'Hello one!',
    });
});

// CREATE One
router.post('/', async (req, res, next) => {
    try {
        console.log(req.body);
        const value = await schema.validateAsync(req.body);
        const inserted = await faqs.insert(value);
        res.json(inserts);
    } catch (error) {
        next(error);
    }
});

// Update One
router.put('/:id', (req, res, next) => {
    res.json({
        message: 'Hello updated one!',
    });
});

// DELETE One
router.delete('/:id', (req, res, next) => {
    res.json({
        message: 'Hello deleted one!',
    });
});

module.exports = router;