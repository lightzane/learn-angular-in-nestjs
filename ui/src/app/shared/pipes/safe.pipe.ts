import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Customized Pipe in Angular !
// declared in app.module.ts declarations
@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  // use this to bypass the 'unsafe' when doing like these:
  // [src]="https://youtube.com/embed" in iframe, etc
  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
