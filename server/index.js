import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import { router } from './routes/index.js';
import errorHandler from './middleware/ErrorHandlingMiddleware.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'static')));

const swaggerDocument = YAML.load(path.join(__dirname, '../docs/swagger.yaml'));

console.log('Loaded paths:', Object.keys(swaggerDocument.paths));
console.log('Offer endpoint exists:', !!swaggerDocument.paths['/offer']);
console.log('Offer examples:', swaggerDocument.paths['/offer']?.post?.requestBody?.content?.['multipart/form-data']?.examples);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', router);

app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();