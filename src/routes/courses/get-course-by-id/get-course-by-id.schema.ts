import { type FastifySchema } from "fastify";
import z from "zod";

const getCourseByIdBodySchema = undefined;

const getCourseByIdResponseSchema = {
  200: z.object({
    course: z.object({
      id: z.uuid(),
      title: z.string(),
      description: z.string().nullable(),
    }),
  }),
  404: z.null(),
};

const getCourseByIdParamsSchema = z.object({ id: z.uuid() });

export const getCourseByIdSchema = {
  tags: ["courses"],
  summary: "Get course by id courses",
  params: getCourseByIdParamsSchema,
  response: getCourseByIdResponseSchema,
  body: getCourseByIdBodySchema,
} as const satisfies FastifySchema;
