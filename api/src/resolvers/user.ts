import { IResolvers } from "../types/graphql";

export const resolvers: IResolvers = {
  Query: {
    user: async (_, {}, ctx) => {
      return null;
    },
  },
};
