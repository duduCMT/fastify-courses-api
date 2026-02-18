import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { eq } from "drizzle-orm";

import { db } from "../../../database/client.ts";
import { courses } from "../../../database/schema.ts";
import { getCourseByIdSchema } from "./get-course-by-id.schema.ts";

export const getCourseByIdRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/courses/:id",
    {
      schema: getCourseByIdSchema,
    },
    async (request, reply) => {
      const courseId = request.params.id;

      const result = await db
        .select()
        .from(courses)
        .where(eq(courses.id, courseId));

      if (result.length > 0) {
        return reply.send({ course: result[0] });
      }

      return reply.code(404).send(null);
    },
  );
};
