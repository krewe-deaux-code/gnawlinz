import { Router } from 'express';

import Boss from '../../db/schemas/boss';

const bossRouter = Router();

bossRouter.get('/:id', (req, res) => {
  Boss.findOne({
    where: {
      _id: req.params.id
    }
  })
    .then((boss) => {
      console.log('BOSS', boss);
      res.status(200).send(boss?.dataValues);
    })
    .catch((err) => {
      console.log('get boss ERROR: ', err);
      res.sendStatus(500);
    });
});

bossRouter.patch('/patch/:id', (req, res) => {
  Boss.update(req.body, { where: { _id: req.params.id }})
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.error('boss patch health fail', err);
      res.sendStatus(500);
    });
});

export default bossRouter;
