import { Router } from "express";
import { getRepository } from "typeorm";
import { Airplane } from "../entity/Airplane";
import { Flight, SeatCategories } from "../entity/Flight";

interface WriteAirplaneDto {
  model: string,
  capacity: number
}

interface WriteFlightDto {
  startTime: number,
  duration: number,
  startId: number,
  destinationId: number,
  seatCategories: SeatCategories,
  airplaneId: number
}

const router = Router();

router.use((request, response, next) => {
  const user = (request.session as any).user;
  if (!user.admin) {
    response.sendStatus(403);
    return;
  }
  next();
});

router.get('/airplanes', async (req, res) => {
  res.json(await getRepository(Airplane).find());
})
router.post('/airplanes', async (req, res) => {
  const data = req.body as WriteAirplaneDto;
  const created = await getRepository(Airplane).save({
    capacity: data.capacity,
    model: data.model
  });
  res.json(created);
})

router.patch('/airplanes/:id', async (req, res) => {
  const data = req.body as WriteAirplaneDto;
  const id = req.params.id;
  const airplane = await getRepository(Airplane).findOne(id);
  if (!airplane) {
    res.sendStatus(404);
    return;
  }
  const created = await getRepository(Airplane).save({
    ...airplane,
    id: Number(id),
    capacity: data.capacity,
    model: data.model
  });
  res.json(created);
})
router.delete('/airplanes/:id', async (req, res) => {
  const id = req.params.id;
  const airplane = await getRepository(Airplane).findOne(id);
  if (!airplane) {
    res.sendStatus(404);
    return;
  }
  await getRepository(Airplane).delete(id);
  res.sendStatus(204);
})

router.post('/flights', async (req, res) => {
  const data = req.body as WriteFlightDto;
  const created = await getRepository(Flight).save(updateFlightFromDto(undefined, data));
  res.json(created);
})
router.patch('/flights/:id', async (req, res) => {
  const data = req.body as WriteFlightDto;
  const id = req.params.id;
  const flight = await getRepository(Flight).findOne(id);
  if (!flight) {
    res.sendStatus(404);
    return;
  }
  const created = await getRepository(Flight).save(updateFlightFromDto(flight, data));
  res.json(created);
})

router.delete('/flights/:id', async (req, res) => {
  const id = req.params.id;
  const flight = await getRepository(Flight).findOne(id);
  if (!flight) {
    res.sendStatus(404);
    return;
  }
  await getRepository(Flight).delete(id);
  res.sendStatus(204);
})

function updateFlightFromDto(flight: Flight | undefined, data: WriteFlightDto) {
  return {
    ...flight,
    airplane: {
      id: data.airplaneId
    },
    destination: {
      id: data.destinationId
    },
    duration: data.duration,
    seatCategories: data.seatCategories,
    start: {
      id: data.startId
    },
    startTime: new Date(data.startTime)
  }
}

export default router;