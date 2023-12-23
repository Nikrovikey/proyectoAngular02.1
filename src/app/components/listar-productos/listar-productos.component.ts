import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';//son librerias que sirven para el diseño de alertas
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.scss']
})
export class ListarProductosComponent {

  listProductos:Producto[]=[];

constructor(private _productoService:ProductoService,private toastr:ToastrService) {}


  ngOnInit():void{
    this.obtenerProductos();


  }

  obtenerProductos(){

    this._productoService.getProductos().subscribe(data=>{

      this.listProductos=data;
      console.log(data);
    },error =>{
      
      console.log("ocurrio un error al obtener la información");
    })

  }

  eliminarProducto(id:any){

    this._productoService.eliminarProducto(id).subscribe(data=>{


    this.toastr.success('El producto fue eliminado con exito','Producto eliminado');
    this.obtenerProductos();

    },error=>{

      console.error();
      
    })

  }
  
}


