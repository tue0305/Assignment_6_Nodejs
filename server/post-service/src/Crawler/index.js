var axios = require("axios").default;
const PostService = require("../services/post_service");
const service = new PostService();
const Post = require("../database/models/Post");
const fs = require("fs");
const crawlData = () => {
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
    axios
        .request(options)
        .then((res) => {
            const data = res.data;
            let dataJson = {};
            data.forEach((element) => {
                let content_data = "";
                dataJson.id_food = element.id;
                dataJson.title = element.title;
                dataJson.ingredients = [...element.ingredients];
                dataJson.image = element.image;
                let content = element.instructions;
                content.forEach((obj) => {
                    content_data += obj.text;
                });
                // console.log(dataJson.ingredients);
                listIngre = [];
                dataJson.ingredients.map((ingredient) => {
                    listIngre.push({ name: ingredient });
                });

                dataJson.content = content_data;

                console.log(dataJson.ingredients);
                const newPost = Post({
                    title: dataJson.title,
                    image: dataJson.image,
                    content: dataJson.content,
                    gradients: listIngre,
                });
                newPost.save();
                console.log(newPost);
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
module.exports = crawlData;
