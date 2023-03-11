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

// <-- THIS is the most recent: https://cloudinary.com/documentation/image_upload_api_reference#sprite
cloudinaryRouter.post('/post', (req, res) => {
  const { topImage, middleImage, bottomImage } = req.body;
  const w = 300;
  const h = 400;
  const f = 'png';
  // const compositeUrl = cloudinary.v2.url(`l_${topImage},l_${middleImage},l_${bottomImage}`); // /w_${w},h_${h},f_${f}
  cloudinary.v2.uploader.generate_sprite(topImage)
    // .then(response => {
    // return cloudinary.v2.uploader.upload(buffer, { folder: '/playerChars' })
    //   .then(final => {
    //     console.log('SUCCESS!!', final);
    //   })
    //   .catch(err => console.error('BUFFERED BUT FINAL FAIL', err));
    // })
    .then(response => console.log('COMPOSITE IMAGE SAVED, BUFFER??', response))
    .catch(err => console.error('FAIL SAVING COMPOSITE IMAGE', err));
  console.log('IMAGE POST FROM CLIENT', topImage, middleImage, bottomImage);
});

// <-- THIS one seems to be the closest: In the Upload API Docs
// cloudinaryRouter.post('/post', (req, res) => {
//   const { topImage, middleImage, bottomImage } = req.body;
//   const w = 300;
//   const h = 400;
//   const f = 'png';
//   const compositeUrl = cloudinary.v2.url(`l_${topImage},l_${middleImage},l_${bottomImage}`); // /w_${w},h_${h},f_${f}
//   cloudinary.v2.api.resource(compositeUrl, { resource_type: 'image' })
//     .then(response => {
//       const buffer = response.buffer;
//       return cloudinary.v2.uploader.upload(buffer, { folder: '/playerChars' })
//         .then(final => {
//           console.log('SUCCESS!!', final);
//         })
//         .catch(err => console.error('BUFFERED BUT FINAL FAIL', err));
//     })
//     .then(response => console.log('COMPOSITE IMAGE SAVED, BUFFER??', response))
//     .catch(err => console.error('FAIL SAVING COMPOSITE IMAGE', err));
//   // console.log('IMAGE POST FROM CLIENT', topImage, middleImage, bottomImage);
// });

// <-- Using .image and transformation
// cloudinaryRouter.post('/post', (req, res) => {
//   const { topImage, middleImage, bottomImage } = req.body;
//   const w = 300;
//   const h = 400;
//   const f = 'png';
// const compositeImage = cloudinary.v2.image(
//   topImage,
//   {
//     transformation: [
//       { overlay: middleImage },
//       { overlay: bottomImage },
//       { format: f }
//     ]
//   }
// );
// cloudinary.v2.uploader.upload(compositeImage)
//     .then(response => console.log('SUCCESS??', response))
//     .catch(err => console.error('FAILURE!!', err));
// });

export default cloudinaryRouter;
