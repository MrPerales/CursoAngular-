import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<task[]>([
    {
      id: Date.now(),
      title: 'instalar angular CLI',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'crear Proyecto',
      completed: false,
    },
  ]);

  getTask(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    if (newTask.length > 0) {
      this.addNewTask(newTask);
    }
  }
  addNewTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((task) => [...task, newTask]);
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((_, i) => i !== index));
  }
}
