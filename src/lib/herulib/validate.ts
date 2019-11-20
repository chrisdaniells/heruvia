import { IEntry, IPage } from '@interfaces';
import { AgeChar } from '@enums';

export function Entry(entry: IEntry): { status: boolean, data: any } {
    const errors: string[] = [];

    if (entry.date.length === 0 || !CalDate(entry.date)) { errors.push('Incorrect Date Format') }
    if (entry.body.length === 0) { errors.push('Please enter an event body') }

    return {
        status: errors.length === 0,
        data: errors,
    };
}

export function Page(page: IPage): string[] {
    let errors: string[] = [];

    if (page.title.length === 0) errors.push('Please enter a page title.');
    if (page.category.length === 0) errors.push('Please select a page category.');
    if (page.subcategory.length === 0) errors.push('Please select a page subcategory.');
    if (page.body.length === 0) errors.push('Please enter a page body');

    return errors;
}

export function CalDate(date: string): boolean {
    const units = date.split('-');
    if (units.length !== 3) return false;

    // Age
    if (!Object.keys(AgeChar).some((char: string) => AgeChar[char as keyof AgeChar] === units[0][0].toLowerCase())) return false;
    // Year && MoonYear
    if (isNaN(units[0].substr(1) as any) || isNaN(units[1] as any)) return false;
    // Month & Day
    let month; let day;
    if (units[2].includes('/')) {
        month = units[2].split('/')[0];
        day = units[2].split('/')[1];
    } else {
        month = units[2];
        day = '00';
    }
    if (month === 'X') { month = '00'; }
    if (isNaN(month as any) || isNaN(day as any)) return false;

    return true;
}