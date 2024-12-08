import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MS PREREGISTER BAQ',
            version: '1.0.0',
            description: 'Documentacion API MS Preregistro BAQ',
            servers: [
                {
                    url: 'http://localhost:3005',
                    description: 'Local server'
                }
            ]
        }
    },
    apis: ['./swagger/*.ts', './src/routes/*.ts']
};

const specs = swaggerJsdoc(options);
export default specs;