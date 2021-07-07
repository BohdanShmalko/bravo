const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const { Pool } = require('pg');

const adminAPI = require('./routes/admin');
const authAPI = require('./routes/auth');
const clientAPI = require('./routes/customer');
const { PORT, DB_SETTINGS } = require('./config');
const databaseProvider = require('./middlewares/databaseProvider')

const db = new Pool(DB_SETTINGS);

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

app.use(databaseProvider(db))
app.use('/admin', adminAPI);
app.use('/auth', authAPI);
app.use('/customer', clientAPI);

app.listen(PORT, () => {
    console.log('Server running on localhost:' + PORT);
})