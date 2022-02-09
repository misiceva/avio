import { Router } from "express";
import { Between, FindCondition, getRepository, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { Airport } from "../entity/Airport";
import { Flight } from "../entity/Flight";
import { Reservation } from "../entity/Reservation";
import { User } from "../entity/User";


const router = Router();

router.post('/logout', async (req, res) => {
  (req.session as any).user = undefined;
  req.session.destroy(e => {
    if (e) {
      console.log(e);
    }
  });
  res.sendStatus(204);
})
router.post('/check', async (req, res) => {
  const user = (req.session as any).user;
  res.json(user)
})

router.get('/airports', async (req, res) => {
  const airports = await getRepository(Airport).find();
  res.json(airports);
})
router.get('/flights', async (req, res) => {
  const from = (req.query as any).from as number | undefined;
  const to = (req.query as any).from as number | undefined;
  const startId = (req.query as any).start as number | undefined;
  const destinationId = (req.query as any).destination as number | undefined;
  let size = (req.query as any).size || 20;
  let page = (req.query as any).page || 0;
  let where = {} as FindCondition<Flight>

  if (startId != undefined) {
    where = {
      start: {
        id: startId
      }
    }
  }
  if (destinationId != undefined) {
    where = {
      ...where,
      destination: {
        id: destinationId
      }
    }
  }
  if (from && to) {
    where = {
      ...where,
      startTime: Between(new Date(from), new Date(to))
    }
  } else {
    if (from) {
      where = {
        ...where,
        startTime: MoreThanOrEqual(new Date(from))
      }
    } else {
      if (to) {
        where = {
          ...where,
          startTime: LessThanOrEqual(new Date(to))
        }
      }
    }
  }
  const flightRepository = getRepository(Flight);
  const total = await flightRepository.count({
    where
  })
  if (size * page > total) {
    page = 0;
  }
  const flights = await flightRepository.find({
    skip: page * size,
    take: size,
    where
  })

  res.json({
    data: flights,
    total,
    page
  })
})

router.get('/flights/:id', async (req, res) => {

  const flight = await getRepository(Flight).findOne({
    relations: ['reservation'],
    where: {
      id: req.params.id
    }
  })
  if (!flight) {
    res.sendStatus(404);
    return;
  }
  res.json({
    ...flight,
    available: flight.airplane.capacity - flight.reservations.length
  });
})
router.post('/flights/:id', async (req, res) => {
  const flight = await getRepository(Flight).findOne({
    relations: ['reservation'],
    where: {
      id: req.params.id
    }
  })
  if (!flight) {
    res.sendStatus(404);
    return;
  }
  if (flight.airplane.capacity <= flight.reservations.length) {
    res.status(400).json({ error: 'Flight is full' });
    return;
  }
  if (new Date(flight.startTime).getTime() > Date.now()) {
    res.status(400).json({ error: 'Flight has already started' });
    return;
  }
  const seatCategoryName = req.body.seatCategory as string;
  const seatCategory = flight.seatCategories.find(e => e.name === seatCategoryName);
  if (!seatCategory) {
    res.status(400).json({ error: 'Invalid seat category' })
  }
  const user = (req.session as any).user as User;
  const reservation = await getRepository(Reservation).save({
    flight,
    price: seatCategory.price,
    seatCategory: seatCategory.name,
    user: {
      id: user.id
    }
  })
  res.json(reservation);
})
router.get('/reservations', async (req, res) => {
  const user = (req.session as any).user as User;
  const reservations = await getRepository(Reservation).find({
    where: {
      user: {
        id: user.id
      }
    }
  });
  res.json(reservations);
})
export default router;