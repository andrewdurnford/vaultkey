import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import * as cors from "cors";
import * as express from "express";
import { resolvers } from "./utils/resolvers";
import { typeDefs } from "./utils/typeDefs";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ prisma }),
});

server.start().then(() => server.applyMiddleware({ app }));

app.listen({ port: 4000 }, () => {
  console.log(`🚀  Server ready at http://localhost:4000${server.graphqlPath}`);
});
