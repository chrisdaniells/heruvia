import { SubCategories, AgeChar } from "@enums";
import { IEntry } from "@interfaces";

export function dateToTimeStamp(date) {
    const units = date.split("-");
    const age = units[0][0].toLowerCase();
    const year = units[0].substr(1);
    const moonYear = units[1];

    let month;
    let day;

    if (units[2].includes("/")) {
        month = units[2].split("/")[0];
        day = units[2].split("/")[1];
    } else {
        month = units[2];
        day = "00";
    }

    if (month === "X") {
        month = "00";
    }

    let ageNum;
    switch (age) {
        case AgeChar.TheAgeOfCreation: ageNum = 1; break;
        case AgeChar.TheAgeOfRaces: ageNum = 2; break;
        case AgeChar.TheAgeOfEmpires: ageNum = 3; break;
        case AgeChar.TheAgeOfUncertainty: ageNum = 4; break;
        case AgeChar.TheAgeOfAwakening: ageNum= 5;  break;
    }

    return (ageNum + year + moonYear + month + day).toString();
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
    return entries.filter((entry: IEntry) => getAgeUnit(entry.date) === age);
}