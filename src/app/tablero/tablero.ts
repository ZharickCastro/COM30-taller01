import { Component, computed, signal } from '@angular/core';

interface Producto {
  nombre: string;
  precio: number;
  cantidad: number;
}

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.html',
  styleUrl: './tablero.css',
})
export class Tablero {
  productos = signal<Producto[]>([
    { nombre: 'Yuca', precio: 2800, cantidad: 3 },
    { nombre: 'Ñame', precio: 4200, cantidad: 2 },
    { nombre: 'Plátano', precio: 1500, cantidad: 6 },
    { nombre: 'Mango', precio: 1800, cantidad: 12 },
    { nombre: 'Guayaba', precio: 1200, cantidad: 0 },
  ]);

  total = computed(() =>
    this.productos().reduce((suma, p) => suma + p.precio * p.cantidad, 0),
  );

  unidades = computed(() =>
    this.productos().reduce((suma, p) => suma + p.cantidad, 0),
  );

  agotados = computed(() => this.productos().filter((p) => p.cantidad === 0).length);

  inventarioBajo = computed(() =>
    this.productos().some((p) => p.cantidad >= 1 && p.cantidad <= 2),
  );

  masCaro = computed<Producto | null>(() => {
    const lista = this.productos();
    if (lista.length === 0) return null;
    return lista.reduce((max, p) => (p.precio > max.precio ? p : max));
  });

  ordenados = computed(() =>
    [...this.productos()].sort(
      (a, b) => b.precio * b.cantidad - a.precio * a.cantidad,
    ),
  );

  vender(nombre: string) {
    this.productos.update((lista) =>
      lista.map((p) =>
        p.nombre === nombre && p.cantidad > 0 ? { ...p, cantidad: p.cantidad - 1 } : p,
      ),
    );
  }

  reabastecer(nombre: string) {
    this.productos.update((lista) =>
      lista.map((p) => (p.nombre === nombre ? { ...p, cantidad: p.cantidad + 10 } : p)),
    );
  }

  venderTodo(nombre: string) {
    this.productos.update((lista) =>
      lista.map((p) => (p.nombre === nombre ? { ...p, cantidad: 0 } : p)),
    );
  }
}
