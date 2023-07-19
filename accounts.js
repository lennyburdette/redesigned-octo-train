import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { readFile } from "node:fs/promises";
import { parse } from "graphql";

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs: parse(await readFile("accounts.graphql", "utf8")),
    resolvers: {
      Query: {
        accounts: () => {
          return [
            {
              __typename: "Domain1Account",
              id: "1",
            },
            {
              __typename: "Domain2Account",
              id: "2",
            },
          ];
        },
      },
      Account: {
        __resolveReference(ref) {
          if (ref.id === "1") {
            return { __typename: "Domain1Account", id };
          } else {
            return { __typename: "Domain2Account", id };
          }
        },
      },
    },
  }),
});

const { url } = await startStandaloneServer(server, { listen: { port: 4001 } });
console.log(`🚀 Accounts subgraph ready at ${url}`);
