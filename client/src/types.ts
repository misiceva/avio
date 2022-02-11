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
  seatCategories: SeatCategory[],
  reservations?: Reservation[]
}
export interface SeatCategory {
  price: number,
  name: string;
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