let buildMakeComment = function (commentValidator) {
  return ({ author, content, article_id } = {}) => {
    let { error } = commentValidator({ author, content, article_id });
    if (error) throw new Error(error);

    return {
      getAuthor: () => author,
      getContent: () => content,
      getArticleId: () => article_id,
    };
  };
};

export default buildMakeComment;
