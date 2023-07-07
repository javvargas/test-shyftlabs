const express = require('express');
const pool = require('../connection');
//const processQuery = require('../services/process.js')

const router = express.Router();

// POST /api/v1/results -> add results
router.post('/', async (req, res) => {
    const body = req.body;
    const queryStr = `INSERT INTO results (id_student, id_course, result) VALUES ("${body.id_student}", "${body.id_course}", "${body.result}")`;
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



// GET /api/v1/results -> list results
router.get('/', async (req, res) => {
    const queryStr = "SELECT r.id, CONCAT(s.firstname, ' ', s.lastname) student, c.course, r.result FROM results r INNER JOIN students s ON s.id = r.id_student INNER JOIN courses c ON c.id = r.id_course ORDER BY result DESC";
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