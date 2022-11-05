import mongoose from "../connection.js";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

let Schema = mongoose.Schema;
let CommentSchema = new Schema({
  author: String,
  content: String,
  article_id: mongoose.Schema.Types.ObjectId,
});

CommentSchema.plugin(aggregatePaginate);

let Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
