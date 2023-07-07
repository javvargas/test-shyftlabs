const express = require('express');

const studentsRouter = require('./students.router');
const coursesRouter = require('./courses.router');
const resultsRouter = require('./results.router');

// Router table
function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/students', studentsRouter);
    router.use('/courses', coursesRouter);
    router.use('/results', resultsRouter);
}

module.exports = routerApi;