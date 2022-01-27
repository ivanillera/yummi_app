import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'urlsafe'
})
export class UrlsafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer){}
  transform(url: any): unknown {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
