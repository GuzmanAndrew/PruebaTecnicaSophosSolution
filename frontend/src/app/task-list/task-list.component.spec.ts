import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../services/task/task.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', ['getTasks', 'createTask',
      'updateTask', 'deleteTask']);

    const mockTasks = [
      { id: 1, title: 'Task 1', description: 'Description 1' },
      { id: 2, title: 'Task 2', description: 'Description 2' }
    ];

    mockTaskService.getTasks.and.returnValue(of(mockTasks));
    mockTaskService.createTask.and.returnValue(of(mockTasks[0]));
    mockTaskService.updateTask.and.returnValue(of(mockTasks[0]));
    mockTaskService.deleteTask.and.returnValue(of(null));

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        NgForOf,
        NgIf,
        TaskListComponent
      ],
      providers: [
        { provide: TaskService, useValue: mockTaskService }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on initialization', () => {
    const mockTasks = [
      { id: 1, title: 'Task 1', description: 'Description 1' },
      { id: 2, title: 'Task 2', description: 'Description 2' }
    ];

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.tasks).toEqual(mockTasks);
  });

  it('should create a task', () => {
    const newTask = { id: 3, title: 'New Task', description: 'New Description' };

    mockTaskService.createTask.and.returnValue(of(newTask));

    const form: NgForm = {
      valid: true,
      resetForm: jasmine.createSpy('resetForm'),
      control: {
        markAllAsTouched: jasmine.createSpy('markAllAsTouched')
      }
    } as any;

    component.addTask(form);
    fixture.detectChanges();

    expect(mockTaskService.createTask).toHaveBeenCalled();
    expect(component.tasks).toContain(newTask);
  });

  it('should update a task', () => {
    const updatedTask = { id: 1, title: 'Updated Task',
      description: 'Updated Description' };

    mockTaskService.updateTask.and.returnValue(of(updatedTask));

    component.tasks = [{ id: 1, title: 'Task 1', description: 'Description 1' }];

    component.updateTask();
    fixture.detectChanges();

    expect(mockTaskService.updateTask).toHaveBeenCalled();
    const task = component.tasks.find(task => task.id === updatedTask.id);
    expect(task).toEqual(updatedTask);
  });

  it('should delete a task', () => {
    const taskToDelete = { id: 1, title: 'Task to Delete',
      description: 'Description to Delete' };

    component.deleteTask(taskToDelete.id);
    fixture.detectChanges();

    expect(mockTaskService.deleteTask).toHaveBeenCalledWith(taskToDelete.id);
    expect(component.tasks).not.toContain(taskToDelete);
  });
});
