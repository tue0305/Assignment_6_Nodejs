const postData = require("./post");
const categoryData = require("./category");
function crawlData() {
    categoryData();
    postData();
}
module.exports = crawlData;
