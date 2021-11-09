import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado!: Heroe;
  heroeNotFound: string = "Héroe no encontrado";

  constructor(private _heroeService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando() {
    this._heroeService.getSugerencias(this.termino.trim())   // .trim() para que cuente los espacios del texto
    .subscribe( heroes => this.heroes = heroes)
  }


  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {

    if (!event.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    }
    const heroe: Heroe = event.option.value;

    this.termino = heroe.superhero;

    if (this.heroes = []) {
        event.option.value = ''
      }
    this._heroeService.getHeroePorId( heroe.id )
    .subscribe( heroe => this.heroeSeleccionado = heroe)

  }


}
