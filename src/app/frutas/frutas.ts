import { Component, computed, signal } from '@angular/core';

interface Producto {
  nombre: string;
  precio: number;
  cantidad: number;
}

@Component({
  selector: 'app-frutas',
  templateUrl: './frutas.html',
  styleUrl: './frutas.css',
})
export class Frutas {
  productos = signal<Producto[]>([
    { nombre: 'Mango', precio: 1800, cantidad: 12 },
    { nombre: 'Guayaba', precio: 1200, cantidad: 8 },
    { nombre: 'Patilla', precio: 6500, cantidad: 2 },
    { nombre: 'Maracuyá', precio: 3400, cantidad: 5 },
    { nombre: 'Níspero', precio: 2900, cantidad: 4 },
  ]);

  totalDinero = computed(() =>
    this.productos().reduce((suma, p) => suma + p.precio * p.cantidad, 0),
  );

  totalUnidades = computed(() =>
    this.productos().reduce((suma, p) => suma + p.cantidad, 0),
  );

  vender(nombre: string) {
    this.productos.update((lista) =>
      lista.map((p) =>
        p.nombre === nombre && p.cantidad > 0 ? { ...p, cantidad: p.cantidad - 1 } : p,
      ),
    );
  }
}
