const fs = require('fs');
const path = require('path');
const Joi = require('joi');

let customItems = require('../data/customItems.json');
const items = require('../data/items.json');
const { custom } = require('joi');

const saveCustomItems = () => fs.writeFileSync(path.resolve('../data/items.js'), customItems);

const itemSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    id: Joi.string()
        .length(8)
        .required(),
    description:Joi.string()
        .optional(),
    pictureUrl: Joi.string()
        .optional
});

const addCustomItem = (item) => {
    const validatedItem = itemSchema.validate(item);
    customItems.push(validatedItem);
    saveCustomItems();
    return validatedItem;
};

const getItems = (includeCustomItems = false) => {
    return [...items, ...(includeCustomItems ? '')]
};

module.exports = {
    addCustomItem
};
