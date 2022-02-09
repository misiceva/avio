import { Router } from "express";


const router = Router();

router.use((request, response, next) => {
  const user = (request.session as any).user;
  if (!user.admin) {
    response.sendStatus(403);
    return;
  }
  next();
});




export default router;