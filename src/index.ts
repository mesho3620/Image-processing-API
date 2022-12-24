import express from 'express';
import Routes from './routes/index';

const app = express();
const port = 3000;
app.use('/api', Routes);

//makes sure that server is working
app.get('/', (req: express.Request, res: express.Response): void => {
  res.status(200).send('Server is working!');
});

// start server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;