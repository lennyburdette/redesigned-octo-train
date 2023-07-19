import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { readFile } from "node:fs/promises";
import { parse } from "graphql";

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs: parse(await readFile("domain1.graphql", "utf8")),
    resolvers: {
      Domain1Account: {
        __resolveReference(ref) {
          return {
            ...ref,
            name: `Domain 1 Account ${ref.id}`,
            domain1Field: "hi",
          };
        },
      },
    },
  }),
});

const { url } = await startStandaloneServer(server, { listen: { port: 4002 } });
console.log(`🚀 Domain 1 subgraph ready at ${url}`);
