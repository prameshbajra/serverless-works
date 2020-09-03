const request = require('request-promise');
const cheerio = require('cheerio');

const getPage = (businessName) => {
    const url = `https://www.yelp.com/biz/${businessName}`;
    return request({
        method: 'GET',
        url
    });
}


const parsePage = (page) => {
    try {
        const $ = cheerio.load(page);
        const reviewCountString = $('');

        console.log(reviewCountString);
    } catch (error) {
        return Promise.reject(`Error in parsing page : ${JSON.stringify(error)}`)
    }
}


module.exports = { getPage, parsePage };