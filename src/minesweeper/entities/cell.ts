import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Coord } from './Coord';

@Entity('cell')
export class Cell {
  @PrimaryColumn()
  id: string;

  @Column()
  boardId: string;

  @Column()
  coord: Coord;

  @Column({ default: false })
  bomb: boolean;

  @Column({ default: 'unchecked' })
  checked: string;
}
