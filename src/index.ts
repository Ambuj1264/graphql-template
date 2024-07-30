import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { AppDataSource } from "./config/typeOrm";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import http from "http";
import { resolvers } from "./graphql";
import { typeDefs } from "./graphql/schema/typedefs";
import yenv from "yenv";
import { GraphQLContext } from "./graphql/util/graphql";
import { authMiddleware } from "./graphql/schema";
import MailService from "./config/mailService";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

const startServer = async () => {
    const env = yenv("env.yaml", { env: "development" });
    const router = express();

    /** Error handling */  
    router.use((req, res, next) => {
        next();
    });

    // MAIL SMTP CONNECTION

    const mailService = MailService.getInstance();
    await mailService.createLocalConnection();

    // Postgress Database CONNECTION
    AppDataSource.initialize()
        .then(() => {
            // tslint:disable-next-line
             console.log("Data Source has been initialized!");
        })
        .catch((err) => {
            // tslint:disable-next-line
             console.error("Error during Data Source initialization", err);
        });

    const httpServer = http.createServer(router);
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/graphql",
      });

    const serverCleanup = useServer({ schema }, wsServer);
    const server = new ApolloServer<GraphQLContext>({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
             // Proper shutdown for the WebSocket server.
    {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
        ],
        
    });

    await server.start();

    router.use(
        "/graphql",
        cors<cors.CorsRequest>(),
        bodyParser.json({ limit: "50mb" }),
           expressMiddleware(server, {
            context: async ({ req, res }) => {
                const {
                     loginId, userId, permissions 
                    } = await authMiddleware(req);

                return {
                    loginId,
                    userId,
                    permissions,
                };
            },
        })
    );

    await new Promise<void>((resolve) => httpServer.listen({
         port: env.PORT || 4719
         }, resolve));
    // tslint:disable-next-line
    console.log("🚀 Server ready at http://localhost:4719/graphql");
    // tslint:disable-next-line
    console.log("🚀 Subscriptions ready at ws://localhost:4719/graphql");
};
startServer();