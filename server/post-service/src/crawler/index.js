var axios = require("axios").default;
const PostService = require("../services/post_service");
const { PostModel, CategoryModel } = require("../database/models");
const service = new PostService();
// const PostModel = require("../database/models");

const crawlData = async () => {
  try {
    let resData = [];
    var options = {
      method: "GET",
      url: "https://random-recipes.p.rapidapi.com/ai-quotes/5",
      headers: {
        "x-rapidapi-host": "random-recipes.p.rapidapi.com",
        "x-rapidapi-key": "fb265b725dmshdf4ad2395c7ed62p1d07f5jsn54a16ee0e489",
      },
    };

    // const title = []
    const title = await CategoryModel.find();
    // await CategoryModel.findOne({ title: title });
    // const randomElement = array[Math.floor(Math.random() * array.length)];

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

          // console.log(dataJson.ingredients);
          const newPost = new PostModel({
            title: dataJson.title,
            image: dataJson.image,
            content: dataJson.content,
            gradients: listIngre,
            category: title[Math.floor(Math.random() * title.length)],
          });
          newPost.save();
          console.log(newPost);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err, "err");
  }
};
module.exports = crawlData;
