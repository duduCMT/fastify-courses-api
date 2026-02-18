import { type FastifySchema } from "fastify";
import z from "zod";

const createCourseBodySchema = z.object({
  title: z.string().min(5, "The title must be at least 5 characters long."),
  description: z.string(),
});

const createCourseResponseSchema = {
  201: z.object({
    id: z.uuid(),
  }),
};

export const createCourseSchema = {
  tags: ["courses"],
  summary: "Create a course",
  body: createCourseBodySchema,
  response: createCourseResponseSchema,
} as const satisfies FastifySchema;
