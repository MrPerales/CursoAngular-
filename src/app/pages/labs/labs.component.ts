import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent {
  welcome = 'welcome to app';
  tasks = ['instalar Angular CLI', 'crear Proyecto ', 'crear compnentes'];
  name = signal('Carlos');
  contador = signal(0);
  image =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/1200px-GitHub_Invertocat_Logo.svg.png';
  disabled = true;
  person = {
    name: 'Carlos',
    email: 'carlos@mail',
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/1200px-GitHub_Invertocat_Logo.svg.png',
  };
  handlerClick() {
    alert('hello ');
  }
  handlerDoubleClick() {
    alert('double click ');
  }
  handlerChange(event: Event) {
    console.log(event);
    // para obtener el valor escrito
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
  handlerKeydown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
  handlerName(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }
  increases() {
    this.contador.update((value) => value + 1);
  }
}
