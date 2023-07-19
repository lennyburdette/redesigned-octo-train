import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { readFile } from "node:fs/promises";
import { parse } from "graphql";

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs: parse(await readFile("domain2.graphql", "utf8")),
    resolvers: {
      Domain2Account: {
        __resolveReference(ref) {
          return {
            ...ref,
            name: `Domain 2 Account ${ref.id}`,
            domain1Field: "bye",
          };
        },
      },
    },
  }),
});
const { url } = await startStandaloneServer(server, { listen: { port: 4003 } });
console.log(`🚀 Domain 2 subgraph ready at ${url}`);
