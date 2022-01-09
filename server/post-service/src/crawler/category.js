const { CategoryModel } = require("../database/models");
const createCategory = require("../services/category_service");
const fs = require("fs");

const crawlCate = async () => {
    const data = await fs.readFileSync(
        "./src/crawler/category.json",
        "utf-8",
        (error, data) => {
            if (error) {
                console.log(error);
            } else {
            }
        }
    );
    const database = JSON.parse(data);
    database.map(async (db) => {
        const newCate = new CategoryModel({
            title: db.title,
            image,
        });
        await newCate.save();
    });
    const categories = CategoryModel.find();
    console.log("Crawl category success!");
    return categories;
};

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
