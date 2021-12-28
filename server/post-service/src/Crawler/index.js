var axios = require("axios").default;
import { createPost } from "../api/controllers/post";
const fs = require("fs");
let resData = [];
var options = {
    method: "GET",
    url: "https://random-recipes.p.rapidapi.com/ai-quotes/5",
    headers: {
        "x-rapidapi-host": "random-recipes.p.rapidapi.com",
        "x-rapidapi-key": "fb265b725dmshdf4ad2395c7ed62p1d07f5jsn54a16ee0e489",
    },
};

(axios
    .request(options)
    .then(function (response) {
        data = response.data;
        let dataJson = {};
        data.forEach((element) => {
            dataJson.id_food = element.id;
            dataJson.title = element.title;
            dataJson.description = {
                ingredients: element.ingredients,
                instructions: element.instructions,
            };
            dataJson.image = element.image;
            resData.push(dataJson);
        });
        fs.writeFileSync("sampledata.json", JSON.stringify(resData));
    })
    .catch(function (error) {
        console.error(error);
    }))();