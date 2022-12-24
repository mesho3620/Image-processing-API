import express from 'express';
import sharp from 'sharp';
import logger from '../../utilities/loggers';
import fs from 'fs/promises';
import path from 'path';
import { Stats } from 'fs';

const imageRouter = express.Router();

imageRouter.get('/', logger, async (req, res) => {

  //reads data from url
  const imageTitle = req.query.title as string;
  const imageHeight = parseInt(req.query.height as unknown as string);
  const imageWidth = parseInt(req.query.width as unknown as string);

  const outputFilePath = `${path.resolve(
    __dirname,
    '../../../assets/thumbnails/' +
      imageTitle +
      imageHeight +
      imageWidth +
      '.jpg'
  )}`;
  const imagesPath = `${path.resolve(
    __dirname,
    '../../../assets/images/' + imageTitle + '.jpg'
  )}`;

  //checks if thumbnail exists
  const ThumbnailExists: Stats | null = await fs
    .stat(outputFilePath)
    .catch(() => {
      return null;
    });

    //checks if image exists
  const originalImage: Stats | null = await fs.stat(imagesPath).catch(() => {
    res.status(404).send('Image does not exist in' + imagesPath);
    return null;
  });

  if (ThumbnailExists) {
    fs.readFile(outputFilePath)
      .then((thumbImage: Buffer) => {
        res.status(200).contentType('jpg').send(thumbImage);
      })
      .catch(() => {
        res.status(500).send('Error occured while processing the image:(');
      });
  } else {
    const transformer = await sharp(imagesPath)
      .resize(imageWidth, imageHeight)
      .toBuffer();

    await fs.writeFile(outputFilePath, transformer).then(() => {
      fs.readFile(outputFilePath)
        .then((thumbImage: Buffer) => {
          res.status(200).contentType('jpg').send(thumbImage);
        })
        .catch(() => {
          res.status(500).send('Error occured while processing the image:(');
        });
    });
  }
});

export default imageRouter;
