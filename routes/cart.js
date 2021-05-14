// app.post('/api/v1/session', sessionController.new);
// app.get('/api/v1/session/:id', sessionController.get)
// app.post('/api/v1/session/:id', sessionController.modify);

const fs = require('fs');
const path = require('path');
const Joi = require('joi');
const uuid = require('uuid');

const items = require('./items');

let sessions = require('../data/sessions.json');
const save = () => fs.writeFileSync(path.resolve('data/sessions.json'), JSON.stringify(sessions));

module.exports = {
    new: (req, res) => {
        const id = uuid.v4();
        sessions[id] = {
            id,
            cart: []
        }
        save()
        return res.status(201).json(sessions[id]);
    },
    get: (req, res) => {
        const { params: { id } } = req;
        if (sessions[id]) {
            return res.status(200).json(sessions[id].cart.map(items.getItem).filter(item => item))
        }
        return res.status(404).send()
    },
    modify: (req, res) => {
        const { params: { id }, body: { cart } } = req;
        if (sessions[id]) {
            sessions[id].cart = cart;
            save();
            return res.status(200).json(sessions[id].cart.map(items.getItem).filter(item => item))
        }
        return res.status(400).send()
    }
};
