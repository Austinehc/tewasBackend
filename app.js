const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const emailRouter = require('./email');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(emailRouter);

app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
});
