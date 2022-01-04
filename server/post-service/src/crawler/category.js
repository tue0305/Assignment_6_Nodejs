const { CategoryModel } = require("../database/models");
const createCategory = require("../services/category_service");
const title = [
    "Happy Sunday",
    "Special Deal",
    "Sale Off",
    "Healthy And Fresh",
    "Traditional",
    "Main Event",
];
// const  crawlCate =function {
//     console.log("1");
//     var executed = false;
//     return function () {
//         if (!executed) {
//             executed = true;
//             title.forEach((element) => {
//                 const newCate = new CategoryModel({
//                     title: element,
//                     posts: [],
//                 });
//                 newCate.save();
//                 console.log(newCate);
//             });
//         }
//     };
// }}
var crawlCate = function func() {
    if (crawlCate.fired) return;
    crawlCate.fired = true;
    title.forEach((element) => {
        const newCate = new CategoryModel({
            title: element,
            posts: [],
        });
        newCate.save();
        console.log(newCate);
    });
};
module.exports = crawlCate;
