const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        // name of your api
        title: 'Backend Node.js API',
        description: 'Esta es una API en node.js'
    },
    host: 'localhost:3000'
};

// Se genera un nuevo archivo con la documentacion
const outputFile = './swagger-output.json';
const routes = ['./index.js'];

// Se genera la documentacion
swaggerAutogen(outputFile, routes, doc);