import mongoose from "mongoose";
import Article from "../../../db/mongodb/models/article.js";
import makeArticle from "../../../models/article/index.js"; // model
import serialize from "./serializer.js"; // serializer custom to db

let listArticles = async (page = 1, limit = 10) => {
  const myAggregate = Article.aggregate();

  const options = {
    page,
    limit,
  };

  let res;
  await Article.aggregatePaginate(myAggregate, options)
    .then(function (result) {
      res = serialize(result.docs);
    })
    .catch(function (err) {
      console.log(err);
    });

  return res;
};

let findArticle = (prop, val) => {
  if (prop === "id") {
    prop = "_id";
  }
  if (prop === "_id") {
    val = mongoose.Types.ObjectId(val);
  }

  return Article.find({ [prop]: val }).then((resp) => {
    return serialize(resp[0]);
  });
};

let findArticles = async (prop, val, page = 1, limit = 10) => {
  if (prop === "id") {
    prop = "_id";
  }
  if (prop === "_id") {
    val = mongoose.Types.ObjectId(val);
  }

  const myAggregate = Article.aggregate().match({ [prop]: val });

  const options = {
    page,
    limit,
  };

  let res;
  await Article.aggregatePaginate(myAggregate, options)
    .then(function (result) {
      res = serialize(result.docs);
    })
    .catch(function (err) {
      console.log(err);
    });

  return res;
};

let addArticle = (articleCreate) => {
  let article = makeArticle(articleCreate);
  let newArticle = {
    title: article.getTitle(),
    body: article.getBody(),
    author: article.getAuthor(),
  };
  return Article.create(newArticle).then(serialize);
};

let deleteArticle = (id) => {
  const objectId = mongoose.Types.ObjectId(id);
  return Article.findByIdAndDelete(objectId)
    .then((resp) => {
      return {
        deletedId: resp._id.toString(),
        status: "success",
      };
    })
    .catch((err) => {
      return {
        status: "fail",
      };
    });
};

let updateArticle = (articleEdit) => {
  const objectId = mongoose.Types.ObjectId(articleEdit.id);

  const filter = { _id: objectId };

  return Article.findOneAndUpdate(filter, articleEdit, {
    new: true,
  })
    .then((resp) => {
      return resp;
    })
    .catch((err) => {
      return {
        status: "fail",
      };
    });
};

let dropAll = async () => {
  await Article.remove();
  return "success";
};

export {
  listArticles,
  findArticle,
  findArticles,
  addArticle,
  deleteArticle,
  updateArticle,
  dropAll,
};
