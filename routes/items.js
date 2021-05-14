const fs = require('fs');
const path = require('path');
const Joi = require('joi');
const uuid = require('uuid');

let customItems = require('../data/customItems.json');
const items = require('../data/items.json');

const saveCustomItems = () => fs.writeFileSync(path.resolve('data/customItems.json'), JSON.stringify(customItems));

const itemSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    description:Joi.string()
        .optional(),
    pictureUrl: Joi.string()
        .optional,
    price: Joi.number()
        .required()
        .min(0.00001)
});

const addCustomItem = (item) => {
    console.log({ item })
    const validatedItem = itemSchema.validate(item);
    if (!validatedItem.value) return null;
    const id = uuid.v4();
    const newItem = {
        id,
        ...validatedItem.value,
    }
    customItems[id] = newItem;
    console.log({ newItem })
    saveCustomItems();

    return newItem;
};

const getItems = (includeCustomItems = false) => {
    return [...Object.values(items), ...(includeCustomItems ? Object.values(customItems) : [])].map(({id, name, pictureUrl}) => ({id, name, pictureUrl}));
};

const getItem = (id) => {
    const jointItems = {...items, ...customItems};
    return jointItems[id];
}

const add = (req, res) => {
    const { body } = req;

    const item = addCustomItem(body);
    if (!item) {
        return res.status(400).json({ message: 'Validation failed!' });
    }
    return res.status(201).json(item.value);
}

const getAll = (req, res) => {
    const { query } = req;
    res.status(200).json(getItems(query.all == 1));
}

const getOne = (req, res) => {
    const { params: { id } } = req;
    const item = getItem(id);
    if (item) {
        return res.status(200).json(item);
    }
    return res.status(404).send();
}

module.exports = {
    getOne,
    getAll,
    add,
    getItem
};
