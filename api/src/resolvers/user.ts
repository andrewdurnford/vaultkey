import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { IResolvers } from "../types/graphql";

export const resolvers: IResolvers = {
  Query: {
    user: async (_, {}, ctx) => {
      if (!ctx.userId) throw new Error("Unauthenticated");

      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.userId,
        },
      });

      if (!user) throw new Error("Unauthenticated");

      return user;
    },
  },
  Mutation: {
    signup: async (_, args, ctx) => {
      let user = await ctx.prisma.user.findUnique({
        where: {
          email: args.input.email,
        },
      });

      if (!!user) throw new Error("Email is already taken");

      user = await ctx.prisma.user.create({
        data: {
          email: args.input.email,
          password: await bcrypt.hash(args.input.password, 10),
        },
      });

      const token = jwt.sign({ sub: user.id }, "secret");

      return { token, user };
    },
    login: async (_, args, ctx) => {
      const user = await ctx.prisma.user.findUnique({
        where: { email: args.input.email },
      });

      if (!user) throw new Error("Email or Password is incorrect");

      const match = await bcrypt.compare(args.input.password, user.password);

      if (!match) throw new Error("Email or Password is incorrect");

      const token = jwt.sign({ sub: user.id }, "secret");

      return { token, user };
    },
  },
};
