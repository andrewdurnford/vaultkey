import { gql } from "apollo-server-express";
import * as fs from "fs";
import * as path from "path";

const schema = fs.readFileSync(path.join(__dirname, "../schema.graphql"), {
  encoding: "utf8",
});

export const typeDefs = gql`
  ${schema}
`;
