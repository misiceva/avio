import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Flight } from "./Flight";
import { User } from "./User";

@Entity()
export class Reservation {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  seatCategory: string;

  @Column()
  price: number;

  @ManyToOne(() => Flight)
  flight: Flight;

  @ManyToOne(() => User)
  user: User;
}