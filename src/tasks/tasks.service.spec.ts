import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create returns a task with an id and the given fields', () => {
    const dto = { title: 'Buy milk', description: '2 litres' };

    const task = service.create(dto);

    expect(task.id).toBeDefined();
    expect(task.title).toBe('Buy milk');
    expect(task.description).toBe('2 litres');
    expect(task.done).toBe(false);
  });

  it('findAll returns an empty array at first, then the created task', () => {
    let tasks = service.findAll();

    expect(tasks.length).toBe(0);

    const dto = { title: 'Buy milk', description: '2 litres' };
    service.create(dto);
    tasks = service.findAll();
    expect(tasks.length).toBe(1);

    expect(tasks[0].id).toBeDefined();
    expect(tasks[0].title).toBe('Buy milk');
    expect(tasks[0].description).toBe('2 litres');
    expect(tasks[0].done).toBe(false);
  });

  it('findOne returns the task with the given id', () => {
    const dto = { title: 'Buy milk', description: '2 litres' };
    const created = service.create(dto);
    const found = service.findOne(created.id);

    expect(found).toBe(created);
  });

  it('findOne throws NotFoundException for an unknown id', () => {
    expect(() => service.findOne('1234')).toThrow(NotFoundException);
  });
});
