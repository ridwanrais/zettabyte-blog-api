const _serializeSingle = (comment) => {
  return {
    id: comment._id,
    article_id: comment.article_id,
    author: comment.author,
    content: comment.content,
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
