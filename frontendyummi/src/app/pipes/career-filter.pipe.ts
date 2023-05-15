import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'careerFilter'
})
export class CareerFilterPipe implements PipeTransform {

    transform(value: any[], arg: string): any {
        if(arg.length < 3) return value;
        const resultPosts = [];
        for(const post of value){
            // || post.subject.toLowerCase().indexOf(arg.toLowerCase()) > -1
            if (post.career.toLowerCase().indexOf(arg.toString().toLowerCase()) > -1) {
                resultPosts.push(post);
            };
        };
        return resultPosts;
    }

}
