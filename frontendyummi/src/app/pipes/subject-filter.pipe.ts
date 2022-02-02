import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subjectFilter'
})
export class SubjectFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
