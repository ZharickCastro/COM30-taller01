import { Component, signal } from '@angular/core';
import { Frutas } from './frutas/frutas';
import { Tablero } from './tablero/tablero';

@Component({
  imports: [Frutas, Tablero],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('taller01');
}
