import { Router } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

const router = Router();


router.post('/login', async (req, res) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  });
  if (!user) {
    res.status(400).json({
      error: 'No such user'
    });
    return;
  }
  (req.session as any).user = user;
  req.session.save(e => {
    if (e) {
      console.log(e);
    }
  });
  res.json(user);
});

router.post('/register', async (req, res) => {
  const userRepository = getRepository(User);
  let user = await userRepository.findOne({
    where: {
      username: req.body.username
    }
  });
  if (user) {
    res.status(400).json({
      error: 'User already exists'
    });
    return;
  }
  const insertResult = await userRepository.insert({
    ...req.body,
    category: 'user'
  });
  const id = insertResult.identifiers[0].id;
  user = await userRepository.findOne(id);
  (req.session as any).user = user;
  req.session.save(e => {
    if (e) {
      console.log(e);
    }
  });
  res.json(user);
})

export default router;