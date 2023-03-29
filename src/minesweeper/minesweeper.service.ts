import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import {
  arrayToMatrixCells,
  DifficultyToSettings,
  generateRandomCells,
} from '../formulas.utils';
import { Board } from './entities/Board.entity';
import { Cell } from './entities/cell';
import { Settings } from './entities/settings.entity';

@Injectable()
export class MinesweeperService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    @InjectRepository(Cell)
    private cellRepository: Repository<Cell>,
  ) {}

  public async findAllBoards(): Promise<Board[]> {
    return await this.boardRepository.find();
  }

  public async findOneBoard(boardId: string): Promise<Board> {
    const board: Board = await this.boardRepository.findOneBy({ id: boardId });
    if (!board) {
      throw new Error('Board not found');
    }
    return board;
  }

  public async findOneCell(cellId: string): Promise<Cell> {
    const cell: Cell = await this.cellRepository.findOneBy({ id: cellId });
    if (!cell) {
      throw new Error('Cell not found');
    }
    return cell;
  }

  public async findCells(boardId: string): Promise<Cell[][]> {
    const board: Board = await this.boardRepository.findOneBy({ id: boardId });
    if (!board) {
      throw new Error('Board not found');
    }
    const settings: Settings = DifficultyToSettings(board.difficulty);

    const cells: Cell[] = await this.cellRepository.find({
      select: [],
      where: { boardId: boardId },
    });

    return arrayToMatrixCells(settings, cells);
  }

  public async createBoard(difficulty: string): Promise<Board> {
    const settings: Settings = DifficultyToSettings(difficulty);
    const newBoardId: string = uuid();
    const newBoard: Board = {
      id: newBoardId,
      status: 'inProgress',
      difficulty: difficulty,
      ...settings,
    };
    await this.boardRepository.save(newBoard);
    return newBoard;
  }

  public async createCells(boardId: string): Promise<Cell[][]> {
    const board: Board = await this.boardRepository.findOneBy({ id: boardId });
    if (!board) {
      throw new Error('Board not found');
    }

    const settings: Settings = DifficultyToSettings(board.difficulty);
    const cells: Cell[][] = generateRandomCells(settings, boardId);
    cells.forEach((row: Cell[]) => {
      row.forEach(async (cell: Cell) => {
        await this.cellRepository.save(cell);
      });
    });
    return cells;
  }

  public async updateBoard(boardId: string, newBoard: Board): Promise<Board> {
    const board: Board = await this.boardRepository.findOneBy({ id: boardId });
    if (!board) {
      throw new Error('Board not found');
    }
    await this.boardRepository.update({ id: boardId }, newBoard);
    return board;
  }

  public async updateCell(cellId: string, newCell: Cell): Promise<Cell> {
    const cell: Cell = await this.cellRepository.findOneBy({ id: cellId });
    if (!cell) {
      throw new Error('Cell not found');
    }
    await this.cellRepository.update({ id: cellId }, newCell);
    return newCell;
  }

  public async removeBoard(boardId: string): Promise<void> {
    const board: Board = await this.boardRepository.findOneBy({ id: boardId });
    if (!board) {
      throw new Error('Board not found');
    }
    // Delete the given board and cells:
    await this.boardRepository.delete({ id: boardId });
    await this.cellRepository.delete({ boardId: boardId });
  }
}
