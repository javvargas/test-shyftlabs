const express = require('express');
const pool = require('../connection');
//const processQuery = require('../services/process.js')

const router = express.Router();

// POST /api/v1/courses -> add course
router.post('/', async (req, res) => {
    const body = req.body;
    const queryStr = `INSERT INTO courses (course) VALUES ("${body.course}")`;
    try {
        const response = await pool.query(queryStr, (err, results) => {
            if (err) {
                return res.send({ "errno": err.errno, "code": err.code });
            } else {
                return res.send(results);
            }
        });
        res.status(201).json({
            message: response
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
});



// GET /api/v1/courses -> list courses
router.get('/', async (req, res) => {
    const queryStr = "SELECT * FROM courses ORDER BY course ASC";
    try {
        const response = await pool.query(queryStr, (err, results) => {
            if (err) {
                return res.send({ "errno": err.errno, "code": err.code });
            } else {
                return res.send(results);
            }
        });
        res.status(204).json({
            message: response
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
});



// DELETE /api/v1/courses/{id} -> delete course
router.delete('/:id', async (req, res) => {
    const { id }  = req.params;
    const queryStr = `DELETE FROM courses WHERE id = ${id}`;
    try {
        const response = await pool.query(queryStr, (err, results) => {
            if (err) {
                return res.send({ "errno": err.errno, "code": err.code });
            } else {
                return res.send(results);
            }
        });
        res.status(204).json({
            message: response
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
});


module.exports = router;