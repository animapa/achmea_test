import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatInput'
})
export class FormatInputPipe implements PipeTransform {
  transform(value: string): string {
    // Remove any non-digit characters
    const cleanedInput = value.replace(/\D/g, '');

    // Split the string into chunks of two characters each
    const chunks = cleanedInput.match(/.{1,2}/g);

    // Join the chunks with '-' separator
    if (chunks) {
      return chunks.join('-');
    } else {
      return value; // Return original value if no chunks found
    }
  }
}
