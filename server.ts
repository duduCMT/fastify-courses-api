import fastify from "fastify";
import { fastifySwagger } from "@fastify/swagger";
import scalarAPIReference from "@scalar/fastify-api-reference";

import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { createCourseRoute } from "./src/routes/courses/create-course/create-course.route.ts";
import { getCourseByIdRoute } from "./src/routes/courses/get-course-by-id/get-course-by-id.route.ts";
import { getCoursesRoute } from "./src/routes/courses/get-courses/get-courses.route.ts";

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>();

if (process.env.NODE_ENV === "development") {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Courses API",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });

  server.register(scalarAPIReference, {
    routePrefix: "/docs",
  });
}

server.setSerializerCompiler(serializerCompiler);
server.setValidatorCompiler(validatorCompiler);

server.register(getCoursesRoute);
server.register(getCourseByIdRoute);
server.register(createCourseRoute);

server.listen({ port: 3333 }).then(() => {
  console.log("HHTP server running!");
});
