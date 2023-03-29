import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('cell')
export class Cell {
  @PrimaryColumn()
  id: string;

  @Column()
  boardId: string;

  @Column()
  x: number;

  @Column()
  y: number;

  @Column({ default: false })
  bomb: boolean;

  @Column({ default: 'unchecked' })
  checked: string;
}
