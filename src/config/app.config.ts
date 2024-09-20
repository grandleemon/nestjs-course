import * as process from "process";

export const appConfig = () => ({
  environment: process.env.NODE_ENV || "production",
  database: {
    host: process.env.DATABASE_HOST || "localhost",
    port: +process.env.DATABASE_PORT || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    synchronize: process.env.DATABASE_SYNC === "true",
    autoLoadEntities: process.env.DATABASE_AUTOLOAD === "true",
  },
});
