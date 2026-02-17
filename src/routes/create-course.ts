import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/courses",
    {
      schema: {
        tags: ["courses"],
        summary: "Create a course",
        body: z.object({
          title: z
            .string()
            .min(5, "The title must be at least 5 characters long."),
          description: z.string(),
        }),
        response: {
          201: z.object({
            id: z.uuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const title = request.body.title;
      const description = request.body.description;

      const result = await db
        .insert(courses)
        .values({
          title,
          description,
        })
        .returning();

      return reply.status(201).send({ id: result[0].id });
    },
  );
};
