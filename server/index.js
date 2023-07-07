const cors = require('cors');
const express = require('express');
const routerApi = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

routerApi(app);

app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`);
});