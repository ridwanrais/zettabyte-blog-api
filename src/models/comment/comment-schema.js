import Joi from "joi";

export default Joi.object().keys({
  author: Joi.string()
    .required()
    .error(() => "must have author as string"),
  content: Joi.string()
    .required()
    .error(() => "must have content as string"),
  article_id: Joi.string()
    .required()
    .error(() => "must have article_id as string"),
});
