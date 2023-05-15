import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'creatorFilter'
})
export class CreatorPipe implements PipeTransform {

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    transform(value: any, arg: string[]): any {
        if(arg?.length < 3) return value;
        const resultPosts = [];
        for(const post of value){
            if (post.creator._id.toLowerCase().indexOf(arg.toString().toLowerCase()) > -1) {
                resultPosts.push(post);
            };
        };
        return resultPosts;
    }

}
