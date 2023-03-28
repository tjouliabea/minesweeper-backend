import { Module } from '@nestjs/common';
import { MinesweeperService } from './minesweeper.service';
import { MinesweeperController } from './minesweeper.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/Board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  controllers: [MinesweeperController],
  providers: [MinesweeperService],
})
export class MinesweeperModule {}
