const EXPRESS = require('express');
const APP = EXPRESS();
const PG = require('pg');
const PORT = process.env.PORT || 3000;

const CONSTRING = process.env.DATABASE_URL || 'postgres://localhost:5432/colors';
const CLIENT = new PG.Client(CONSTRING);
CLIENT.connect();

app.use(function (req, res, next) { 
    res.setHeader('Access-Control-Allow-Origin', 'https://angry-leavitt-b02e7c.netlify.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    if ('OPTIONS' === req.method) {
        res.send(204);
    } else {
        next();
    }
});

function dropTable(request, response) {
    CLIENT.query('DROP TABLE IF EXISTS color_list').then(makeTable).then(seedDB).catch(err => console.error('drop table error:', err))
}

function makeTable(request, response) {
    CLIENT.query(`CREATE TABLE color_list (
        color_id SERIAL PRIMARY KEY,
        hex VARCHAR(255) UNIQUE)`)
        .catch(err => console.error('Make Table Error:', err));
}

function seedDB() {
    for(let i = 0; i < 100; i++) {
        let hex = createHexColor()
        CLIENT.query(`INSERT INTO color_list(hex) VALUES($1) ON CONFLICT (hex) DO NOTHING`, [hex])
            .catch(err => console.error('SeedDB Error:', err));
    }
}

function createHexColor() {
    const chars = '0123456789ABCDEF'
    let color = '#'
    for(let i = 0; i < 6; i++) {
        color += chars[Math.floor(Math.random() * 16)]
    }
    return color
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
