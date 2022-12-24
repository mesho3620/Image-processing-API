import express from 'express';
import imageRouter from './api/images';
import fs from 'fs';

const Routes = express.Router();

//makes sure that the route is working properly
Routes.get('/', (req, res) => {
  res.send('routes main have been reached');
});

Routes.use('/Images', imageRouter);
export default Routes;
