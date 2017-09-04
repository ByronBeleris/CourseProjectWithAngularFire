import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shoppingListUserFilter',
  pure: false
})
export class ShoppingListUserFilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    const resultArray = [];    
    if (value.length === 0) {
      return value;
    }
    for (const item of value){
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
