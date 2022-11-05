const _serializeSingle = (article) => {
  return {
    id: article._id,
    title: article.title,
    author: article.author,
    body: article.body,
  };
};

const serializer = (data) => {
  if (!data) {
    return null;
  }
  if (Array.isArray(data)) {
    return data.map(_serializeSingle);
  }
  return _serializeSingle(data);
};

export default serializer;
