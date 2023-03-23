import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creatorFilter'
})
export class CreatorPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg?.length < 3) return value;
    const resultPosts = [];
    for(const post of value){
      if (post.creator._id.toLowerCase().indexOf(arg.toString().toLowerCase()) > -1) {
        resultPosts.push(post);
      };
    };
    return resultPosts
  }

}
