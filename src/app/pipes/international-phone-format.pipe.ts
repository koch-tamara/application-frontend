import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'internationalPhoneFormat',
})
export class InternationalPhoneFormatPipe implements PipeTransform {

  private readonly austrianDialingCode = '+43';

  transform(value: string): string {
    value.replaceAll('/', '');
    value.replaceAll(' ', '');

    if (value.startsWith(this.austrianDialingCode)) {
      return value;
    }

    if (value.startsWith('0')) {
      value.replace('0', this.austrianDialingCode);
    }
    return value;
  }
}
