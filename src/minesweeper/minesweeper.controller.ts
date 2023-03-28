import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Board } from './entities/Board.entity';
import { Cell } from './entities/cell';
import { MinesweeperService } from './minesweeper.service';

@Controller('minesweeper')
export class MinesweeperController {
  constructor(private readonly minesweeperService: MinesweeperService) {}

  @Get()
  findAllBoards(): Promise<Board[]> {
    return this.minesweeperService.findAllBoards();
  }

  @Get(':id')
  findOneBoard(@Param('id') boardId: string): Promise<Board> {
    return this.minesweeperService.findOneBoard(boardId);
  }

  @Get('cell:id')
  findOneCell(@Param('id') cellId: string): Promise<Cell> {
    return this.minesweeperService.findOneCell(cellId);
  }

  @Get('cells:id')
  findCells(@Param('id') boardId: string): Promise<Cell[][]> {
    return this.minesweeperService.findCells(boardId);
  }

  @Post(':difficulty')
  createBoard(@Param('difficulty') difficulty: string): Promise<Board> {
    return this.minesweeperService.createBoard(difficulty);
  }

  @Post('cells:id')
  createCells(@Param('id') boardId: string): Promise<Cell[][]> {
    return this.minesweeperService.createCells(boardId);
  }

  @Patch(':id')
  updateBoard(
    @Param('id') boardId: string,
    @Body() newBoard: Board,
  ): Promise<Board> {
    return this.minesweeperService.updateBoard(boardId, newBoard);
  }

  @Patch('cell:id')
  updateCell(
    @Param('id') cellId: string,
    @Body() newCell: Cell,
  ): Promise<Cell> {
    return this.minesweeperService.updateCell(cellId, newCell);
  }

  @Delete(':id')
  removeBoard(@Param('id') boardId: string): Promise<void> {
    return this.minesweeperService.removeBoard(boardId);
  }
}
