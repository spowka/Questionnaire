import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform<T extends { [key: string]: any }>(items: T[], key: string, value: boolean): T[] {
        if (!items || !key) {
            return items;
        }

        return items.filter(item => item[key].length ? !!item[key].length === value : item[key] === value);
    }
}