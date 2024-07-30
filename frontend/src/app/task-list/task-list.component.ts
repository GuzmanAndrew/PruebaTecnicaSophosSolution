import { Component } from '@angular/core';
import {TaskService} from "../services/task/task.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule, NgForm} from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    NgClass
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  tasks: any[] = [];
  newTask: any = { title: '', description: '' };
  editingTask: any = null;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
    });
  }

  addTask(form: NgForm) {
    if (form.valid) {
      this.taskService.createTask(this.newTask).subscribe(task => {
        this.tasks.push(task);
        this.newTask = { title: '', description: '' };
        form.resetForm();
      });
    } else {
      form.control.markAllAsTouched();
    }
  }

  editTask(task: any) {
    this.editingTask = { ...task };
  }

  updateTask() {
    this.taskService.updateTask(this.editingTask).subscribe(updatedTask => {
      const index = this.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }
      this.editingTask = null;
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  cancelEdit() {
    this.editingTask = null;
  }
}
