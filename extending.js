import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { readFile } from "node:fs/promises";
import { parse } from "graphql";

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs: parse(await readFile("extending.graphql", "utf8")),
    resolvers: {
      Account: {
        __resolveReference(ref) {
          return {
            ...ref,
            extending: "here's an extension",
          };
        },
      },
    },
  }),
});

const { url } = await startStandaloneServer(server, { listen: { port: 4004 } });
console.log(`🚀 Extending subgraph ready at ${url}`);
