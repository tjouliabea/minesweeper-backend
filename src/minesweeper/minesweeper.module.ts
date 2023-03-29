import { Module } from '@nestjs/common';
import { MinesweeperService } from './minesweeper.service';
import { MinesweeperController } from './minesweeper.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/Board.entity';
import { Cell } from './entities/cell';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Cell])],
  controllers: [MinesweeperController],
  providers: [MinesweeperService],
})
export class MinesweeperModule {}
