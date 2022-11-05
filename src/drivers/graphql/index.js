import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {
  addArticle,
  deleteArticle,
  findArticle,
  findArticles,
  listArticles,
  updateArticle,
} from "../../data-access/articles-db/mongodb/index.js";
import {
  addComment,
  deleteComment,
  dropAll,
  findComment,
  findComments,
  listComments,
  updateComment,
} from "../../data-access/comments-db/mongodb/index.js";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Article {
    id: String!
    title: String!
    author: String!
    body: String!
  }

  type Comment {
    id: String!
    author: String!
    content: String!
    article_id: String!
  }

  type Query {
    listArticles(page: Int, limit: Int): [Article],
    findArticle(property: String!, value: String!): Article,
    findArticles(property: String!, value: String!, page: Int, limit: Int): [Article]
    listComments(page: Int, limit: Int): [Comment],
    findComment(property: String!, value: String!): Comment,
    findComments(property: String!, value: String!, page: Int, limit: Int): [Comment]
  }

  type Mutation {
    addArticle(title: String!, body: String!, author: String!): Article,
    deleteArticle(id: String!): String,
    updateArticle(id: String!, title: String, body: String, author: String): Article,
    addComment(author: String!, content: String!, article_id: String!): Comment,
    deleteComment(id: String!): String,
    updateComment(id: String!, author: String, content: String, article_id: String): Comment,
    dropAllComments: String
  }
`;

// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
  Query: {
    listArticles: async (parent, { page, limit }) => {
      return listArticles(page, limit);
    },
    findArticle: async (parent, { property, value }) => {
      return findArticle(property, value);
    },
    findArticles: async (parent, { property, value, page, limit }) => {
      return findArticles(property, value, page, limit);
    },
    listComments: async (parent, { page, limit }) => {
      return listComments(page, limit);
    },
    findComment: async (parent, { property, value }) => {
      return findComment(property, value);
    },
    findComments: async (parent, { property, value, page, limit }) => {
      return findComments(property, value, page, limit);
    },
  },
  Mutation: {
    addArticle: async (parent, { title, body, author }) => {
      const article = await addArticle({ title, body, author });
      return article;
    },
    deleteArticle: async (parent, { id }) => {
      const { deletedId } = await deleteArticle(id);
      return deletedId;
    },
    updateArticle: async (parent, { id, title, body, author }) => {
      const article = await updateArticle({ id, title, body, author });
      return article;
    },
    addComment: async (parent, { author, content, article_id }) => {
      return addComment({ author, content, article_id });
    },
    deleteComment: async (parent, { id }) => {
      const { deletedId } = await deleteComment(id);
      return deletedId;
    },
    updateComment: async (parent, { id, author, content, article_id }) => {
      const comment = await updateComment({ id, author, content, article_id });
      return comment;
    },
    dropAllComments: async () => {
      return dropAll();
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
