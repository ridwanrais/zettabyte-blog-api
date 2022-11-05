import Joi from "joi";

export default Joi.object().keys({
  title: Joi.string()
    .required()
    .error(() => "must have title as string"),
  author: Joi.string()
    .required()
    .error(() => "must have author as string"),
  body: Joi.string()
    .required()
    .error(() => "must have body as string"),
});
