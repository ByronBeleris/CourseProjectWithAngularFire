import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recipeDescriptionFilter'
})
export class RecipeDescriptionFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value.length >= 30) {
      return (value.slice(0, 30) + ' ...read more')
    }else {
      return (value);
    }
  }

}
