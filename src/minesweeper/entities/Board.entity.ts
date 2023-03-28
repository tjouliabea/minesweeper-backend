import { Entity, PrimaryColumn, Column } from 'typeorm';
import { Cell } from './cell';

@Entity('board')
export class Board {
  @PrimaryColumn()
  id: string;

  @Column({ default: 'inProgess' })
  status: string;

  @Column({ default: 'normal' })
  difficulty: string;

  @Column({ default: 16 })
  width: number;

  @Column({ default: 16 })
  height: number;

  @Column({ default: 40 })
  bombNumber: number;
}
