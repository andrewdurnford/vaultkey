import * as glob from "glob";
import * as path from "path";
import { merge } from "lodash";

export const resolvers = glob
  .sync(path.join(__dirname, "../resolvers/**/*.ts"))
  .map((file) => require(file))
  .reduce((acc, curr) => merge({}, acc, curr.resolvers), {});
