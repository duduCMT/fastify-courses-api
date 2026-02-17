import fastify from "fastify";
import { fastifySwagger } from "@fastify/swagger";
import scalarAPIReference from "@scalar/fastify-api-reference";

import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { createCourseRoute } from "./src/routes/create-course.ts";
import { getCoursesRoute } from "./src/routes/get-courses.ts";
import { getCourseByIdRoute } from "./src/routes/get-courses-by-id.ts";

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
