import { IResolvers } from "../types/graphql";

export const resolvers: IResolvers = {
  Query: {
    item: async (_, { id }, ctx) => {
      const { userId } = ctx;

      if (!userId) throw new Error("Unauthenticated");

      return await ctx.prisma.item.findUnique({
        where: {
          id_userId: {
            id,
            userId,
          },
        },
      });
    },
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
