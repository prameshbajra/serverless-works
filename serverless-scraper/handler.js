'use strict';

const { getPage, parsePage } = require('./controller/controller');

module.exports.scrape = async event => {
    console.log(event);
    getPage(event).then((page) => {
        parsePage(page);
    });
};
