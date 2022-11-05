import buildMakeComment from "./comment.js";
import commentSchema from "./comment-schema.js";

import commentValidator from "../validator/index.js";

const newCommentValidator = commentValidator(commentSchema);

let makeComment = buildMakeComment(newCommentValidator);

export default makeComment;
