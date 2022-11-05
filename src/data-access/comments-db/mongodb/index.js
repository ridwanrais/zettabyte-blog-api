import mongoose from "mongoose";
import Comment from "../../../db/mongodb/models/comment.js";
import makeComment from "../../../models/comment/index.js"; // model
import serialize from "./serializer.js"; // serializer custom to db
import { findArticle } from "../../../data-access/articles-db/mongodb/index.js";

let listComments = async (page = 1, limit = 10) => {
  const myAggregate = Comment.aggregate();

  const options = {
    page,
    limit,
  };

  let res;
  await Comment.aggregatePaginate(myAggregate, options)
    .then(function (result) {
      res = serialize(result.docs);
    })
    .catch(function (err) {
      console.log(err);
    });

  return res;
};

let findComment = (prop, val) => {
  if (prop === "id") {
    prop = "_id";
  }
  if (prop === "_id") {
    val = mongoose.Types.ObjectId(val);
  }

  return Comment.find({ [prop]: val }).then((resp) => {
    return serialize(resp[0]);
  });
};

let findComments = async (prop, val, page = 1, limit = 10) => {
  if (prop === "id") {
    prop = "_id";
  }
  if (prop === "_id") {
    val = mongoose.Types.ObjectId(val);
  }

  const myAggregate = Comment.aggregate().match({ [prop]: val });

  const options = {
    page,
    limit,
  };

  let res;
  await Comment.aggregatePaginate(myAggregate, options)
    .then(function (result) {
      res = serialize(result.docs);
    })
    .catch(function (err) {
      console.log(err);
    });

  return res;
};

let addComment = async (commentCreate) => {
  const article = await findArticle("id", commentCreate.article_id);
  if (!article) {
    // TODO: handle error
    console.log("article tidak ditemukan");
    return null;
  }

  let comment = makeComment(commentCreate);
  let newComment = {
    author: comment.getAuthor(),
    content: comment.getContent(),
    article_id: comment.getArticleId(),
  };
  return Comment.create(newComment).then(serialize);
};

let deleteComment = (id) => {
  const objectId = mongoose.Types.ObjectId(id);
  return Comment.findByIdAndDelete(objectId)
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

let updateComment = async (commentEdit) => {
  const article = await findArticle("id", commentEdit.article_id);
  if (!article) {
    // TODO: handle error
    console.log("article tidak ditemukan");
    return null;
  }

  const objectId = mongoose.Types.ObjectId(commentEdit.id);

  const filter = { _id: objectId };

  return Comment.findOneAndUpdate(filter, commentEdit, {
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
  await Comment.remove();
  return "success";
};

export {
  listComments,
  findComment,
  findComments,
  addComment,
  deleteComment,
  updateComment,
  dropAll,
};
