import 'dotenv/config';
import axios from 'axios';
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

cloudinaryRouter.post('/post', (req, res) => {

  const { topImageUrl, middleImageUrl, bottomImageUrl, characterObj } = req.body;

  const findPublicID = (imageUrl, folderName) => {
    const startIndex = imageUrl.search(folderName);
    return imageUrl.slice(startIndex, -4);
  };

  const hairID = findPublicID(topImageUrl, 'hair');
  const faceID = findPublicID(middleImageUrl, 'face');
  const bodyID = findPublicID(bottomImageUrl, 'body');
  console.log('UNDEFINED?', characterObj);
  console.log('HAIR?', topImageUrl);
  cloudinary.v2.uploader.explicit(bodyID, {
    type: 'upload',
    eager: [
      {
        transformation: [
          { overlay: { public_id: hairID } },
          { overlay: { public_id: faceID } },
          // { format: 'png' }
        ]
      }
    ]
  })
    .then((response) => {
      console.log('SUCCESS!!!!', response, response.eager[0].url); // response.eager[0].url
      characterObj.image_url = response.eager[0].url;
      axios.post('http://localhost:8080/character/newCharacter', { newCharacter: characterObj })
        .then(response => console.log('new char in DB', response))
        .catch(err => console.error('new char fail', err));
    })
    .catch(err => console.error('FAIL CLOUD UPLOAD', err));
});

export default cloudinaryRouter;
