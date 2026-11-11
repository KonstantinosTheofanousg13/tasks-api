import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.model';
import { randomUUID } from 'crypto';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: string): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  create(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: randomUUID(),
      title: createTaskDto.title,
      description: createTaskDto.description ?? '',
      done: false,
    };
    this.tasks.push(task);
    return task;
  }

  update(id: string, done: boolean): Task {
    const task = this.findOne(id);
    task.done = done;
    return task;
  }

  remove(id: string): void {
    const task = this.findOne(id);
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
  }
}
