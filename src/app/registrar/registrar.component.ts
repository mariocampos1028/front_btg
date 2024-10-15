import { ClienteService } from './../servicios/cliente.service';
import { Component, OnInit } from '@angular/core';
import { Tipoproducto } from '../modelos/tipoproducto';

import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Producto } from '../modelos/producto';
import { Cliente } from '../modelos/cliente';


@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent implements OnInit{

  formgroup = new FormGroup({
    documento: new FormControl(''),
    nombre: new FormControl(''),
    saldo: new FormControl(''),
    email: new FormControl(''),
    telefono: new FormControl('')
  });

  clientesArray:Cliente[] = [];



  constructor(private clienteService:ClienteService){}

  ngOnInit(): void {
    this.clienteService.get_clientes().subscribe(
      data => {
        this.clientesArray = data;  // Asigna los datos a la variable de productos
        console.log(this.clientesArray);

      },
      error => {
        console.log(error);
      }
    );
  }

  clicSaveCliente():void {
    const objCliente = new Cliente()
    objCliente.id = Number(this.formgroup.get("documento")?.value);
    objCliente.nombre = this.formgroup.get("nombre")?.value as string;
    objCliente.saldo = Number(this.formgroup.get("saldo")?.value);
    objCliente.email = this.formgroup.get("email")?.value as string;
    objCliente.telefono = this.formgroup.get("telefono")?.value as string;

    this.clienteService.crear_cliente(objCliente).subscribe(
      response => {
        console.log("Cliente guardado exitosamente", response);
        alert('Cliente guardado correctamente')
        this.formgroup.reset()

      },
      error => {
        alert('Error guardando cliente')
        console.error("Error al guardar el cliente", error);
      }
    );


  }

  eliminarCliente(cliente: Cliente): void {
    const confirmDelete = confirm(`¿Estás seguro de que deseas eliminar al cliente ${cliente.nombre}?`);
    if (confirmDelete) {
      // Llamamos al servicio para eliminar el cliente
      this.clienteService.eliminar_cliente(cliente).subscribe(
        response => {
          // El cliente fue eliminado, ahora actualizamos la lista de clientes
          this.clientesArray = this.clientesArray.filter(c => c.id !== cliente.id);
          alert('Cliente eliminado con éxito');
        },
        error => {
          console.error(error);
          alert('Error al eliminar el cliente');
        }
      );
    }
  }

}
