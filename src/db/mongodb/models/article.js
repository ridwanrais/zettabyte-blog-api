import mongoose from "../connection.js";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

let Schema = mongoose.Schema;
let ArticleSchema = new Schema({
  title: String,
  author: String,
  body: String,
});

ArticleSchema.plugin(aggregatePaginate);

let Article = mongoose.model("Article", ArticleSchema);

export default Article;
