import { type FastifySchema } from "fastify";
import z from "zod";

const getCoursesBodySchema = undefined;

const getCoursesResponseSchema = {
  200: z.object({
    courses: z.array(
      z.object({
        id: z.uuid(),
        title: z.string(),
      }),
    ),
  }),
};

export const getCoursesSchema = {
  tags: ["courses"],
  summary: "Get all courses",
  response: getCoursesResponseSchema,
  body: getCoursesBodySchema,
} as const satisfies FastifySchema;
