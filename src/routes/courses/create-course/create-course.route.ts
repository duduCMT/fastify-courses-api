import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { db } from "../../../database/client.ts";
import { courses } from "../../../database/schema.ts";
import { createCourseSchema } from "./create-course.schema.ts";

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/courses",
    {
      schema: createCourseSchema,
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
