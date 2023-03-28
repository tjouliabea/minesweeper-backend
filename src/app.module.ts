import { Module } from '@nestjs/common';
import { MinesweeperModule } from './minesweeper/minesweeper.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './minesweeper/entities/Board.entity';

@Module({
  imports: [
    MinesweeperModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [Board],
      synchronize: false,
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {}
