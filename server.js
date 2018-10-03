const EXPRESS = require('express');
const PARSE = require('body-parser');
const APP = EXPRESS();
const PG = require('pg');
const PORT = process.env.PORT || 3000;

const CONSTRING = process.env.DATABASE_URL || 'postgres://localhost:5432/colors';
const CLIENT = new PG.Client(CONSTRING);
CLIENT.connect();

function dropTable(request, response) {
    CLIENT.query('DROP TABLE color_list').then(makeTable).catch(err => console.error('drop table error:', err))
}

function makeTable(request, response) {
    CLIENT.query(`CREATE TABLE color_list (
        color_id SERIAL PRIMARY KEY,
        hex VARCHAR(255) UNIQUE,
        name VARCHAR(255))`)
        .then(seedDB)
        .catch(err => console.error('your error', err));
}

function seedDB() {
    CLIENT.query(`INSERT INTO color_list(hex, name) VALUES($1, $2) ON CONFLICT (hex) DO NOTHING`, ['#FF0000', 'Red'])
        .catch(err => console.error(err));
}

APP.get('/api/colors', function(request, response) {
    CLIENT.query('SELECT * FROM color_list')
        .then(results => response.send(results.rows))
        .catch(err => console.error('/api/colors', err))
})

APP.post('/seeddb', function(request, response) {
    dropTable()
    response.send({'response': 'table created and seeded with colors'})
})

APP.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
