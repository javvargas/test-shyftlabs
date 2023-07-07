const express = require('express');
const pool = require('../connection');

const router = express.Router();

// POST /api/v1/students -> add student
router.post('/', async (req, res) => {
    const body = req.body;
    const queryStr = `INSERT INTO students (firstname, lastname, birth, email) VALUES ("${body.firstname}", "${body.lastname}", "${body.birth}", "${body.email}")`;
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



// GET /api/v1/students -> list student
router.get('/', async (req, res) => {
    const queryStr = "SELECT * FROM students ORDER BY lastname ASC";
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


// DELETE /api/v1/students/{id} -> delete student
router.delete('/:id', async (req, res) => {
    const { id }  = req.params;
    const queryStr = `DELETE FROM students WHERE id = ${id}`;
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