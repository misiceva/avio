import { Router } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

const router = Router();


router.post('/login', async (req, res) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({
    where: {
      email: req.body.email,
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

  try {
    const user = await userRepository.save({
      ...req.body,
      category: 'user'
    });
    (req.session as any).user = user;
    req.session.save(e => {
      if (e) {
        console.log(e);
      }
    });
    res.json(user);
  } catch (error) {
    res.status(400).send('User already exists');
  }
})

export default router;