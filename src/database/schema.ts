import { pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("users", (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  name: t.text().notNull(),
  email: t.text().notNull().unique(),
}));

export const courses = pgTable("courses", (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  title: t.text().notNull().unique(),
  description: t.text(),
}));