import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { TodoService } from './todo.service';
import { GetUser } from 'src/auth/decorator';
import { CreateTodoDto, EditTodoDto } from './dto';

@UseGuards(JwtGuard)
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get()
  getTodos(@GetUser('id') authorId: number) {
    return this.todoService.getTodos(authorId);
  }
  @Get(':id')
  getTodo( 
    @GetUser('id') authorId: number,
    @Param('id', ParseIntPipe) todoId: number,
  ) {
    return this.todoService.getTodo(authorId, todoId);
  }
  @Post()
  @HttpCode(HttpStatus.OK)
  createTodo(@GetUser('id') authorId: number, @Body() dto: CreateTodoDto) {
    return this.todoService.createTodo(authorId, dto);
  }

  @Patch(":id")
  updateTodo(
    @GetUser('id') authorId: number,
    @Param('id', ParseIntPipe) todoId: number,
    @Body() dto: EditTodoDto,
  ) {
    return this.todoService.updateTodo(authorId, todoId, dto);
  }

  @Delete(":id")
  deleteTodo(
    @GetUser('id') authorId: number,
    @Param('id', ParseIntPipe) todoId: number,
  ) {
    return this.todoService.deleteTodo(authorId, todoId);
  }
}
