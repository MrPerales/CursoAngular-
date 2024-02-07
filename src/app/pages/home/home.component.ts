import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { task } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
  // ('valor por defecto', {opciones} )
  taskControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });
  validateControl() {
    // trim() elimina espacios
    if (this.taskControl.valid && this.taskControl.value.trim().length > 3) {
      const newTask = this.taskControl.value;
      this.addNewTask(newTask);
      this.taskControl.setValue('');
    }
  }
  // getTask(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   const newTask = input.value;
  //   if (newTask.length > 0) {
  //     this.addNewTask(newTask);
  //   }
  // }
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
  updateTask(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      });
    });
  }
}
