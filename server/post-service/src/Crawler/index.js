var axios = require("axios").default;
const PostService = require("../services/post_service");
const service = new PostService();
const fs = require("fs");
const crawlData = async () => {
    let resData = [];
    var options = {
        method: "GET",
        url: "https://random-recipes.p.rapidapi.com/ai-quotes/5",
        headers: {
            "x-rapidapi-host": "random-recipes.p.rapidapi.com",
            "x-rapidapi-key":
                "fb265b725dmshdf4ad2395c7ed62p1d07f5jsn54a16ee0e489",
        },
    };
    await axios
        .request(options)
        .then((res) => {
            const data = res.data;
            let dataJson = {};
            data.forEach((element) => {
                dataJson.id_food = element.id_food;
                dataJson.title = element.title;
                dataJson.description = {
                    ingredients: element.ingredients,
                    instructions: element.instructions,
                };

                dataJson.image = element.image;
                resData.push(dataJson);
            });
            fs.writeFileSync("data.json", JSON.stringify(resData));
        })
        .catch((err) => {
            console.log(err);
        });

    //             // service.createPost(
    //             //     element.title,
    //             //     element.image,
    //             //     element.instructions,
    //             //     element.ingredients,
    //             //     "",
    //             //     ""
};
module.exports = crawlData;
