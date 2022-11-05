let buildMakeArticle = function (articleValidator) {
  return ({ title, author, body } = {}) => {
    let { error } = articleValidator({ title, author, body });
    if (error) throw new Error(error);

    return {
      getTitle: () => title,
      getAuthor: () => author,
      getBody: () => body,
    };
  };
};

export default buildMakeArticle;
