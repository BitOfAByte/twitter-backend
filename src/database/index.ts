import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "./models/User.entity";
import { Post } from "./models/Post.entity";
import { Updoot } from "./models/Updoot.entity";

export const AppdataSource: DataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: ["src/database/migrations/*.ts"],
  migrationsTableName: "migrations_typeorm",
  entities: [User, Post, Updoot],
});
