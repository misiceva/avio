import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Airplane {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string;

  @Column()
  capacity: number;

}