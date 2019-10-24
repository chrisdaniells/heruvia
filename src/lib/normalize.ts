const consonants = [
    "Đ", "ð", "Ç", "ç", "Ћ", "þ", "Ş", "ş",
];

export function normalizeCharacter(char: string) {
    switch (char) {
        case "Đ":
            return "D";
        case "ð":
            return "d";      
        case "Ç":
            return "C";
        case "ç":
            return "c";
        case "Ћ":
            return "T";
        case "þ":
            return "t";
        case "Ş":
            return "S";
        case "ş":
            return "s";
        default:
            return char.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
}

export function normalizeString(string: string) {
    const newString = [...string].map((char) => normalizeCharacter(char)).join('');
    return newString;
}