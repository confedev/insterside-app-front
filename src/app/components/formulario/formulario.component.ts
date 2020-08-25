import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  cliente: any = {
    id: null,
    nombre: '',
    apellido: '',
    cuenta: '',
  };

  clientes: any[] = [];

  constructor( private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.obtenerClientes();

  }

  obtenerClientes(): void{
    this.clienteService.getClientes()
      .subscribe( clientes => {
        this.clientes = clientes;
      });
  }

  guardar( forma: NgForm ): void {
    if ( forma.invalid ) {

      Object.values( forma.controls ).forEach( control => {
        control.markAsTouched();
      });
      return;
    }
    this.clienteService.actualizarCliente(forma.value).subscribe(
      () => {
        forma.reset();
        this.limpiar();
        this.obtenerClientes();
      }
    );
  }

  editar(cliente: any): void{
    this.cliente = cliente;
  }

  eliminar(id: number): void{
    this.clienteService.deleteCliente(id).subscribe(
      () => this.obtenerClientes()
    );
  }

  limpiar(): void{
    this.cliente = {
      id: null,
      nombre: '',
      apellido: '',
      cuenta: '',
    };
  }

  agregarCuenta(){
    
  }
}
