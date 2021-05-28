import express from 'express';
import './database.js';

import Router from './routes/index.js';

const app = express();

app.use(express.json());

//routes
app.use(Router);

app.listen(4000);
console.log('Server on port', 4000);

export default app;
