const postData = require("./post");
const crawlCate = require("./category");
const crawlData = async () => {
    await crawlCate();
    setTimeout(async () => {
        postData();
    }, 1000);
};

module.exports = crawlData;
