import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../models/Note';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg.length < 3) return value;
    const resultPosts = [];
    for(const post of value){
      // || post.subject.toLowerCase().indexOf(arg.toLowerCase()) > -1
      if (post.category.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(post);
      };
    };
    return resultPosts
  }

}
