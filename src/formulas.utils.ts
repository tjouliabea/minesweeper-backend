/* eslint-disable prettier/prettier */
import { Cell } from './minesweeper/entities/cell';
import { Settings } from './minesweeper/entities/settings.entity';

export function DifficultyToSettings(difficulty: string): Settings {
  switch (difficulty) {
    case 'easy':
      return {
        width: 9,
        height: 9,
        bombNumber: 10,
      };
    case 'normal':
      return {
        width: 16,
        height: 16,
        bombNumber: 40,
      };
    case 'hard':
      return {
        width: 30,
        height: 16,
        bombNumber: 99,
      };
    default:
      return {
        width: 16,
        height: 16,
        bombNumber: 40,
      };
  }
}

export function generateRandomCells(settings: Settings, boardId: string): Cell[][] {
  const cellNumber = settings.width * settings.height;
  const cellIndexes: number[] = [...Array(cellNumber).keys()];
  const bombIndexes: number[] = getRandomArrayFromArray(
    cellIndexes,
    settings.bombNumber,
  );

  // Create the cells of size 'settings.width x settings.height'
  const cells: Cell[][] = new Array(settings.width).fill(null).map(() =>
    new Array(settings.height).fill(null).map(() => new Cell),
  );
  for (let i = 0; i < settings.width; i++) {
    for (let j = 0; j < settings.height; j++) {
      const cell: Cell = {
        id: i.toString() + ':' + j.toString(),
        boardId: boardId,
        x: i,
        y: j,
        bomb: bombIndexes.includes(i * settings.height + j),
        checked: 'unchecked',
      };
      cells[i][j] = cell;
    }
  }
  return cells;
}

export function getRandomArrayFromArray(arr: any[], num: number): any[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

export function arrayToMatrixCells(settings: Settings, arrayCells: Cell[]): Cell[][] {
  const matrixCells: Cell[][] = new Array(settings.width).map(() =>
    new Array(settings.height).fill({}),
  );
  for (let i = 0; i < arrayCells.length; i++) {
    const cell = arrayCells[i];
    matrixCells[cell.x][cell.y] = cell;
  }
  return matrixCells;
}
