import { IResolvers } from "../types/graphql";

export const resolvers: IResolvers = {
  Query: {
    items: async (_, args, ctx) => {
      if (!ctx.userId) throw new Error("Unauthenticated");

      return await ctx.prisma.item.findMany({
        where: { userId: ctx.userId },
      });
    },
  },
  Mutation: {
    itemCreate: async (_, args, ctx) => {
      if (!ctx.userId) throw new Error("Unauthenticated");

      const item = await ctx.prisma.item.create({
        data: {
          name: args.input.name,
          username: args.input.username,
          password: args.input.password,
          userId: ctx.userId,
        },
      });

      return item;
    },
  },
};
