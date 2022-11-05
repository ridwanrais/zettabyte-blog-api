import buildMakeArticle from "./article.js";
import articleSchema from "./article-schema.js";

import articleValidator from "../validator/index.js";

const newArticleValidator = articleValidator(articleSchema);

let makeArticle = buildMakeArticle(newArticleValidator);

export default makeArticle;
