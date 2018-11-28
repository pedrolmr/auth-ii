const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const db = require('./data/dbConfig');

const server = express();

server.use(express.json());
server.use(cors());

server.post('/api/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 8); 
    creds.password = hash;

    db('users')
        .insert(creds)
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(error => json({error}));
});

server.post('/api/login', (req, res) => {
    const creds = req.body;

    db('users')
        .where({ username: creds.username }).first()
        .then(user => {
            if(user && bcrypt.compareSync(creds.password, user.password)){
                res.status(200).json({message: 'WELCOME!'});
            }else{
                res.status(401).json({message: 'You are not allowed here'});
            }
        })
        .catch(error => res.json({error}))
})

server.get('/api/users', (req, res)=> {
    db('users')
        .select('id', 'username', 'password', 'department')
        .then(users => {
            res.json(users);
        })
        .catch(error => res.send(error))
})

const port = 8000;
server.listen(port, () => console.log(`running on port: ${port}`));