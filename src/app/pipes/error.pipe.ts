import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'error',
  standalone: true
})
export class ErrorPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    let stringVal: string = String(value);
    
    return (stringVal[0].toUpperCase() + stringVal.slice(1)).concat('.')
  }
}
