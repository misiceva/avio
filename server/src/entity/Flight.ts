import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Airplane } from "./Airplane";
import { Airport } from "./Airport";
import { Reservation } from "./Reservation";

@Entity()
export class Flight {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startTime: Date;

  @Column()
  duration: number;

  @ManyToOne(() => Airport, { eager: true })
  start: Airport;

  @ManyToOne(() => Airport, { eager: true })
  destination: Airport;

  @Column({
    transformer: {
      from: JSON.parse,
      to: JSON.stringify
    },
    type: 'json'
  })
  seatCategories: SeatCategories;

  @OneToMany(() => Reservation, r => r.flight)
  reservations: Reservation[]

  @ManyToOne(() => Airplane, { eager: true })
  airplane: Airplane;
}

export interface SeatCategories {
  [key: string]: number
}