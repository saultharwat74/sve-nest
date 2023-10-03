import { PrismaService } from '../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateTodoDto, EditTodoDto } from './dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}
  getTodos(authorId: number) {
    return this.prisma.todo.findMany({
      where: {
        authorId,
      },
    });
  }

  getTodo(authorId: number, todoId: number) {
    return this.prisma.todo.findUnique({
      where: {
        id: todoId,
        authorId,
      },
    });
  }
  async createTodo(authorId: number, dto: CreateTodoDto) {
    const todo = await this.prisma.todo.create({
      data: {
        ...dto,
        authorId,
      },
    });

    return todo;
  }

  async updateTodo(authorId: number, todoId: number, dto: EditTodoDto) {
    const todo = await this.prisma.todo.findUnique({
      where: {
        id: todoId,
        authorId,
      },
    });

    if (!todo || todo.authorId !== authorId) {
      throw new ForbiddenException("You can't update this todo");
    }
    return this.prisma.todo.update({
      where: {
        id: todoId,
        authorId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteTodo(authorId: number, todoId: number) {
    const todo = await this.prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });
    if (!todo || todo.authorId !== authorId) {
      throw new ForbiddenException("You can't delete this todo");
    }
    await this.prisma.todo.delete({
      where: {
        id: todoId,
        authorId,
      },
    });
  }
}
