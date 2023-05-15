import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

    transform(value: any[], arg: string): any {
        if(arg.length < 3) return value;
        const resultPosts = [];
        for(const post of value){
            if (post.category.toLowerCase().indexOf(arg.toString().toLowerCase()) > -1) {
                resultPosts.push(post);
            };
        };
        return resultPosts;
    }

}
