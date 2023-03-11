import 'dotenv/config';
import { Router } from 'express';
import cloudinary from 'cloudinary';

const cloudinaryRouter = Router();

const { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.v2.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET
});

cloudinaryRouter.get('/get', (req, res) => {
  const folder = req.query.folder;
  cloudinary.v2.api.resources({
    type: 'upload',
    prefix: `${folder}`
  })
    .then(response => {
      console.log('RESPONSE FROM CLOUDINARY', response);
      res.send(response.resources);
    })
    .catch(err => {
      console.error('FETCH FROM CLOUDINARY FAIL', err);
    });
});

export default cloudinaryRouter;
