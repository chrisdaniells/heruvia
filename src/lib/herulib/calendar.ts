import { SubCategories, AgeChar } from '@enums';
import { IEntry } from '@interfaces';

export function dateToTimeStamp(date) {
    const units = date.split('-');
    const age = units[0][0].toLowerCase();
    const year = units[0].substr(1);
    const moonYear = units[1];

    let month;
    let day;

    if (units[2].includes('/')) {
        month = units[2].split('/')[0];
        day = units[2].split('/')[1];
    } else {
        month = units[2];
        day = '00';
    }

    if (month === 'X') {
        month = '00';
    }

    let ageNum;
    switch (age) {
        case AgeChar.TheAgeOfCreation: ageNum = 1; break;
        case AgeChar.TheAgeOfRaces: ageNum = 2; break;
        case AgeChar.TheAgeOfEmpires: ageNum = 3; break;
        case AgeChar.TheAgeOfUncertainty: ageNum = 4; break;
        case AgeChar.TheAgeOfAwakening: ageNum= 5;  break;
    }

    const stringDate = (ageNum + year.padStart(4, '0') + moonYear.padStart(3, '0') + month.padStart(2, '0') + day.padStart(2, '0')).toString();
    console.log(stringDate);
    return parseInt(stringDate);
}

export function getAgeUnit(date: string) {
    return date[0].toLowerCase();
}

export function getAgeName(date: string) {
    switch (getAgeUnit(date)) {
        case AgeChar.TheAgeOfCreation:
            return SubCategories.TheAgeOfCreation;
        case AgeChar.TheAgeOfRaces:
            return SubCategories.TheAgeOfRaces;
        case AgeChar.TheAgeOfEmpires:
            return SubCategories.TheAgeOfEmpires;
        case AgeChar.TheAgeOfUncertainty:
            return SubCategories.TheAgeOfUncertainty;
        case AgeChar.TheAgeOfAwakening:
            return SubCategories.TheAgeOfAwakening;
    }
}

export function filterEntriesByAge(entries: IEntry[], age: AgeChar): IEntry[] {
    if (entries.length === 0) return [];
    return entries.filter((entry: IEntry) => getAgeUnit(entry.date) === age);
}

export function sortByDate(entries: IEntry[]) {
    return entries.sort((a: any, b: any) => {
        const aDate = dateToTimeStamp(a.date);
        const bDate = dateToTimeStamp(b.date);
        if (aDate < bDate) return -1;
        else if (aDate > bDate) return +1;
        else return 0;  
    });
}