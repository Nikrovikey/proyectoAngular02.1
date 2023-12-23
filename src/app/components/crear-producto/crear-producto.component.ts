import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss'],
})
export class CrearProductoComponent {
  productoForm: FormGroup;
  titulo = 'Crear Producto';
  btnTitle = 'Crear';


  id: string | null;
  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _productoService: ProductoService,
    private aRouter: ActivatedRoute
  ) {
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto() {

    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    }

if(this.id!==null){

  this._productoService.editarProducto(this.id,PRODUCTO).subscribe(data=>{
    this.toastr.info('se actualizó el producto!', 'producto actualizado!');
    this.router.navigate(['/']);

  }, error => {
    console.error(error);
    this.toastr.error('ocurrio un error al momento de agregar el producto!', 'el producto no se agregó');
  })

}else{
    this._productoService.guardarProducto(PRODUCTO).subscribe(data => {
      this.toastr.success('se agrego el producto!', 'producto registrado!');
      this.router.navigate(['/']);
    }, error => {
      console.error(error);
      this.toastr.error('ocurrio un error al momento de agregar el producto!', 'el producto no se agregó');
    })
  }
  
  }

  esEditar() {

    if (this.id !== null) {
      this.titulo = 'Editar producto';
      this.btnTitle='Actualizar';
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio,
        })
      })
    }
  }




}
