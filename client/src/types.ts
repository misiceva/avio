export interface Airplane {
  id: number,
  model: string,
  capacity: number
}
export interface Airport {
  id: number,
  name: string,
  location: string
}

export interface Flight {
  id: number,
  startTime: string,
  duration: number,
  start: Airport,
  destination: Airport,
  airplane: Airplane,
  seatCategories: SeatCategories,
  reservations?: Reservation[]
}
export interface SeatCategories {
  [key: string]: number
}
export interface Reservation {
  id: number,
  seatCategory: string,
  price: number,
  flight?: Flight,
  user?: User
}
export interface User {
  price: number,
  firstName: string,
  lastName: string,
  email: string,
  admin: boolean,
}

export interface Page<T> {
  data: T[],
  total: number,
  page: number
}
export interface WriteFlightDto {
  startTime: number,
  duration: number,
  startId: number,
  destinationId: number,
  seatCategories: SeatCategories,
  airplaneId: number
}

export const SERVER = 'https://localhost:8000'