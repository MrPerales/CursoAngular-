import { Component, computed, signal } from '@angular/core';
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
  // filtrado de tareas
  // <filters> es el tipo de dato
  filter = signal<'all' | 'pending' | 'completed'>('all');
  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }
  // computer ( elementos a los que vamos a reaccionar cuando cambien (signals ))
  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending') {
      return tasks.filter((task) => !task.completed);
    }
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }
    // filter all
    return tasks;
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

  deleteTask(id: number) {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
  }
  updateTask(id: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      });
    });
  }
  updateTaskEditionMode(id: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            editing: true,
          };
        }
        // para que solo se edite uno
        return {
          ...task,
          editing: false,
        };
      });
    });
  }
  updateTaskTitle(event: Event, id: number) {
    //no poder editar si esta completada

    const input = event.target as HTMLInputElement;
    const newTitle = input.value.trim();
    this.tasks.update((tasks) => {
      return tasks.map((task) => {
        // evitamos que agregen puros espacios
        if (task.id === id && newTitle.length > 1 && !task.completed) {
          return {
            ...task,
            title: newTitle,
            editing: false,
          };
        }
        return task;
      });
    });
  }
}
