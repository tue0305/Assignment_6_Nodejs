const { CategoryModel } = require("../database/models");
const createCategory = require("../services/category_service");
const fs = require("fs");

function crawlCate() {
    fs.readFileSync("./src/crawler/category.json", "utf-8", (error, data) => {
        if (error) {
            console.log(error);
        } else {
            const database = JSON.parse(data);
            database.forEach((db) => {
                const newCate = new CategoryModel({
                    title: db.title,
                });
                newCate.save();
            });
        }
    });
}

// var crawlCate = function func() {
//     if (crawlCate.fired) return;
//     crawlCate.fired = true;
//     title.forEach((element) => {
//         const newCate = new CategoryModel({
//             title: element,
//             posts: [],
//         });
//         newCate.save();
//         console.log(newCate);
//     });
// };
module.exports = crawlCate;
