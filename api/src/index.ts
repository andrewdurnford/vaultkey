import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import * as cors from "cors";
import * as express from "express";
import * as jwt from "jsonwebtoken";
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
  context: async ({ req }) => {
    try {
      const header = req.headers.authorization;
      const token = header.replace("Bearer ", "");
      const payload = jwt.verify(token, "secret") as any;
      const userId = payload.sub;

      return { prisma, userId };
    } catch {
      return { prisma };
    }
  },
});

server.start().then(() => server.applyMiddleware({ app }));

app.listen({ port: 4000 }, () => {
  console.log(`🚀  Server ready at http://localhost:4000${server.graphqlPath}`);
});
