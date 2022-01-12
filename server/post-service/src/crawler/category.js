const { CategoryModel } = require("../database/models");
const CategoryService = require("../services/category_service");
const fs = require("fs");
const service = new CategoryService();

const crawlCate = async () => {
    const data = fs.readFileSync(
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
    await database.map(async (db) => {
        const newCate = await service.createCategory({
            title: db.title,
            file: db.image,
        });
        console.log(newCate);
    });

    console.log("Crawl category success!");
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
