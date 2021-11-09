import { Pipe, PipeTransform } from '@angular/core';
import { ImgSrcDirective } from '@angular/flex-layout';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  pure: false
})
export class ImagenPipe implements PipeTransform {

// Pipe personalizado para pasar la imagen a cada card
  transform(heroe: Heroe): string{

    if ( !heroe.id ){
      return 'assets/no-image.png';
    } else if( heroe.alt_img ){
      return heroe.alt_img
    } else {
      return  `assets/heroes/${ heroe.id }.jpg`;
    }
  }

}
