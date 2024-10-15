import { FondoService } from './../servicios/fondo.service';
import { ProductoService } from './../servicios/producto.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ID, Producto } from '../modelos/producto';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Cliente } from '../modelos/cliente';
import { ClienteService } from '../servicios/cliente.service';
import { Transaccion } from '../modelos/transaccion';
import { TransaccionService } from '../servicios/transaccion.service';
import { Fondo } from '../modelos/fondo';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit{

  formgroup = new FormGroup({
    cliente: new FormControl(''),
    tipo: new FormControl(''),
    fondo: new FormControl(''),
    monto: new FormControl('')
  });
  clientesArray:Cliente[] = [];
  transaccionArray:Transaccion[] = [];
  fondosArray:Fondo[] = [];


  constructor(private clienteService:ClienteService, private transaccionService:TransaccionService, private fondoService:FondoService){}

  ngOnInit(): void {
    this.actualizarClientes()
    this.actualizarFondos()
    this.actualizarTransacciones()
  }

  actualizarClientes(){
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

  actualizarFondos(){
    this.fondoService.get_fondos().subscribe(
      data => {
        this.fondosArray = data;
        console.log(this.fondosArray);

      },error => {
        console.log(error)

      }
    )
  }

  actualizarTransacciones(){
    this.transaccionService.get_transacciones().subscribe(
      data =>{
        this.transaccionArray = data;
        console.log(this.transaccionArray)
      },
      error =>{
        console.log(error);
      }
    );
  }


  clicSaveTransaccion(){

    const transac = new Transaccion()
    transac.tipo = this.formgroup.get('tipo')?.value as string;
    const clienteValue = this.formgroup.get('cliente')?.value;
    if (clienteValue && typeof clienteValue === 'object') {
      const objCliente: Cliente = clienteValue;
      transac.cliente = objCliente.nombre
      transac.id_cliente = objCliente.id

    }
    const fondoValue = this.formgroup.get('fondo')?.value;
    if (fondoValue && typeof fondoValue === 'object') {
      const objfondo:Fondo = fondoValue;
      transac.fondo = objfondo.nombre
      transac.id_fondo = objfondo.id

    }
    transac.monto = Number(this.formgroup.get('monto')?.value)
    const today = new Date();

    // Formatear la fecha manualmente
    const formattedDate = today.getDate().toString().padStart(2, '0') + '-' +
                          (today.getMonth() + 1).toString().padStart(2, '0') + '-' +
                      today.getFullYear() + ' ' +
                      today.getHours().toString().padStart(2, '0') + ':' +
                      today.getMinutes().toString().padStart(2, '0') + ':' +
                      today.getSeconds().toString().padStart(2, '0');
    transac.fecha = formattedDate
    console.log(transac);

    this.transaccionService.crearTransaccion(transac).subscribe(
      data => {
        console.log(data);

        if(data.status == 200){
          alert(data.message)
          this.formgroup.reset()
          this.actualizarTransacciones()
        }else{
          alert(data.message)
        }
      }
    )

  }







}
