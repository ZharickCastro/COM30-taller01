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
  // Requisito 1: el inventario del día, en una signal.
  productos = signal<Producto[]>([
    { nombre: 'Mango', precio: 1800, cantidad: 12 },
    { nombre: 'Guayaba', precio: 1200, cantidad: 8 },
    { nombre: 'Patilla', precio: 6500, cantidad: 2 },
    { nombre: 'Maracuyá', precio: 3400, cantidad: 5 },
    { nombre: 'Níspero', precio: 2900, cantidad: 4 },
  ]);

  // Requisito 2: total en dinero, derivado de productos().
  totalDinero = computed(() =>
    this.productos().reduce((suma, p) => suma + p.precio * p.cantidad, 0),
  );

  // Requisito 4: total de UNIDADES, no de dinero. Otro computed independiente.
  totalUnidades = computed(() =>
    this.productos().reduce((suma, p) => suma + p.cantidad, 0),
  );

  // Requisito 3: vender resta una unidad sin mutar el arreglo por dentro.
  // Se construye una lista nueva con map(); los demás productos quedan igual.
  vender(nombre: string) {
    this.productos.update((lista) =>
      lista.map((p) =>
        p.nombre === nombre && p.cantidad > 0 ? { ...p, cantidad: p.cantidad - 1 } : p,
      ),
    );
  }
}
