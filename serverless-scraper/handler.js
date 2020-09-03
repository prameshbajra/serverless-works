'use strict';

const { getPage } = require('./controller/controller');

module.exports.hello = async event => {
    getPage(event);
};
