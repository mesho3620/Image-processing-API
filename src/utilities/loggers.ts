import express from "express";

const logger = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  console.log(`${req.query.title}was modified`);
  next();
};

export default logger;