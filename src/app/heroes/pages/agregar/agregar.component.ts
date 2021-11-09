import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img {
    width: 100%;
    border-radius: 5%;
  }
  `
  ]
})
export class AgregarComponent implements OnInit {

  // para el select
  publisher = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe ={
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(
    private heroeService  : HeroesService,
    private activatedRoute: ActivatedRoute,
    private router        : Router,
    private _snackBar     : MatSnackBar,
    public dialog         : MatDialog  ) { }

  ngOnInit(): void {

    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.heroeService.getHeroePorId( id ))
    )
    .subscribe(heroe => this.heroe = heroe);
  }

  guardar() {
    if(this.heroe.superhero.trim().length === 0) {
      return;
    }

    if(this.heroe.id){
      // Actualizar
      this.heroeService.actualizarHeroe(this.heroe)
        .subscribe(heroe => this.mostrarSnackbar('Registro actualizado'))
    } else {
      // Crear
      this.heroeService.agregarHeroe(this.heroe)
      .subscribe( heroe => {
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnackbar('Registro creado')
      })
    }
  }

  borrarHeroe() {

    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '350px',
      data: this.heroe // data que se le envia al dialogo
    });
    // me subscribo a la accion luego de cerrar dialog, el metodo borrar emite un true
    dialog.afterClosed().subscribe(
      (result) => {
        if ( result ) {
          this.heroeService.borrarHeroe(this.heroe.id)
            .subscribe(resp => {

              this.router.navigate(['/heroes']);

            })

        }
      }
    )
  }

  mostrarSnackbar( mensaje: string ) {
    this._snackBar.open(mensaje, 'ok!', {
      duration: 2500
    })
  }

}
