const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: 'dpg-civq3dc07spr6t9jdf2g-a',
        user: 'andy',
        password: 'EpHN547JNxMFO63ZK9kIZk67r8nfx6FK',
        database: 'smartbrain_pqri'
    }
});

const app = express();

app.use(cors())
app.use(express.json());
app.get('/', (req, res) => { res.send(db.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(3000, () => {
    console.log('app is running on port 3000');
})