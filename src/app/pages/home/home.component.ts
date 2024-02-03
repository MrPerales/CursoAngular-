import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal([
    'instalar Angular CLI',
    'crear Proyecto ',
    'crear compnentes',
    'crear servicio',
  ]);

  addNewTask(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    if (newTask.length > 0) {
      this.tasks.update((task) => [...task, newTask]);
    }
  }
  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((_, i) => i !== index));
  }
}
