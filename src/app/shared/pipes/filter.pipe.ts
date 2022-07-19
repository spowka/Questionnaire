import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform<T extends {[key: string]: any}>(items: T[], key: string, value: any): T[] {
        if (!items || !key || !value) {
            return items;
        }
        return items.filter(item => item[key] === value);
    }
}