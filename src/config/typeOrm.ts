import { DataSource } from "typeorm";
import yenv from "yenv";
const env = yenv("env.yaml", { env: "development" });

export const AppDataSource = new DataSource({
    type: env.DB_TYPE,
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    synchronize: true,
    entities: ["src/database/**/*.ts"],
    migrations: ["src/database/migration/**/*.ts"],
    subscribers: ["src/database/subscriber/**/*.ts"],
});
