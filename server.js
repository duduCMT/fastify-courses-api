const fastfy = require('fastify');
const crypto = require('crypto');

const server = fastfy();

const courses = [
  { id: '1', title: 'Curso de Node.JS' },
  { id: '2', title: 'Curso de React' },
  { id: '3', title: 'Curso de React Native' },
];

server.get('/courses', () => {
  return { courses };
});

server.post('/courses', (request, reply) => {
  const courseId = crypto.randomUUID();
  const courseTitle = request.body.title;

  if(!courseTitle) {
    return reply.status(400).send({ message: "Título obrigatório." });
  }

  courses.push({ id: courseId, title: courseTitle });
  return reply.status(401).send({ courseId });
});

server.get('/courses/:id', (request, reply) => {
  const courseId = request.params.id;
  const course = courses.find(({ id }) => id === courseId);

  if (course) {
    return { course };
  }  

  return reply.code(404).send();
})

server.listen({ port: 3333 }).then(() => {
  console.log("HHTP server running!") 
});