import { CharacterType } from './enums';
import { IAlphabet } from './interfaces';

const alphabet: IAlphabet[] = [
    // Vowels
    { name: 'ada', type: CharacterType.Vowel, romanised: { lowercase: 'a', uppercase: 'A', }, ipa: 'ɑ' },
    { name: 'äda', type: CharacterType.Vowel, romanised: { lowercase: 'ä', uppercase: 'Ä', }, ipa: 'ɑ:' },
    { name: 'ãda', type: CharacterType.Vowel, romanised: { lowercase: 'ã', uppercase: 'Ã', }, ipa: 'ɑɪ' },

    { name: 'ega', type: CharacterType.Vowel, romanised: { lowercase: 'e', uppercase: 'E', }, ipa: 'ɛ' },
    { name: 'ëga', type: CharacterType.Vowel, romanised: { lowercase: 'ë', uppercase: 'Ë', }, ipa: 'ɜː' },
    { name: 'ẽga', type: CharacterType.Vowel, romanised: { lowercase: 'ẽ', uppercase: 'Ẽ', }, ipa: 'ɛɪ' },

    { name: 'ima', type: CharacterType.Vowel, romanised: { lowercase: 'i', uppercase: 'I', }, ipa: 'ɪ' },
    { name: 'ïma', type: CharacterType.Vowel, romanised: { lowercase: 'ï', uppercase: 'Ï', }, ipa: 'ɛː' },
    { name: 'ĩma', type: CharacterType.Vowel, romanised: { lowercase: 'ĩ', uppercase: 'Ĩ', }, ipa: 'iː' },

    { name: 'osa', type: CharacterType.Vowel, romanised: { lowercase: 'o', uppercase: 'O', }, ipa: 'ɒ' },
    { name: 'ösa', type: CharacterType.Vowel, romanised: { lowercase: 'ö', uppercase: 'Ö', }, ipa: 'ɔː' },
    { name: 'õsa', type: CharacterType.Vowel, romanised: { lowercase: 'õ', uppercase: 'Õ', }, ipa: 'ɔɪ' },

    { name: 'uba', type: CharacterType.Vowel, romanised: { lowercase: 'u', uppercase: 'U', }, ipa: 'ʌ' },
    { name: 'üba', type: CharacterType.Vowel, romanised: { lowercase: 'ü', uppercase: 'Ü', }, ipa: 'uː' },
    { name: 'ũba', type: CharacterType.Vowel, romanised: { lowercase: 'ũ', uppercase: 'Ũ', }, ipa: 'uɪ' },

    // Consonants
    { name: 'gorsa', type: CharacterType.Consonant, romanised: { lowercase: 'g', uppercase: 'G', }, ipa: 'g',
        rules: { allowed: { after: ["şüta", "þüta", "sema", "mema", "nema", "taþa", "daþa", "paþa", "baþa"] } } },
    { name: 'korsa', type: CharacterType.Consonant, romanised: { lowercase: 'k', uppercase: 'K', }, ipa: 'k',
        rules: { allowed: { after: ["şüta", "þüta", "sema", "mema", "nema", "taþa", "daþa", "paþa", "baþa"] } } },

    { name: 'baþa', type: CharacterType.Consonant, romanised: { lowercase: 'b', uppercase: 'B', }, ipa: 'b',
        rules: { allowed: { after: ["şüta", "þüta", "rüta", "çema", "ðema", "vema", "sema", "mema", "nema"] } } },
    { name: 'paþa', type: CharacterType.Consonant, romanised: { lowercase: 'p', uppercase: 'P', }, ipa: 'p',
        rules: { allowed: { after: ["şüta", "þüta", "rüta", "çema", "ðema", "vema", "sema", "mema", "nema"] } } },
    { name: 'daþa', type: CharacterType.Consonant, romanised: { lowercase: 'd', uppercase: 'D', }, ipa: 'd',
        rules: { allowed: { after: ["şüta", "þüta", "rüta", "çema", "ðema", "vema", "sema", "mema", "nema"] } } },
    { name: 'taþa', type: CharacterType.Consonant, romanised: { lowercase: 't', uppercase: 'T', }, ipa: 't',
        rules: { allowed: { after: ["şüta", "þüta", "rüta", "çema", "ðema", "vema", "sema", "mema", "nema"] } } },

    { name: 'nema', type: CharacterType.Consonant, romanised: { lowercase: 'n', uppercase: 'N', }, ipa: 'n',
        rules: { allowed: { after: ["şüta", "þüta", "rüta"] } } },
    { name: 'mema', type: CharacterType.Consonant, romanised: { lowercase: 'm', uppercase: 'M', }, ipa: 'm',
        rules: { allowed: { after: ["şüta", "þüta", "rüta"] } } },
    { name: 'sema', type: CharacterType.Consonant, romanised: { lowercase: 's', uppercase: 'S', }, ipa: 's',
        rules: { allowed: { after: ["şüta", "þüta", "rüta"] } } },
    { name: 'vema', type: CharacterType.Consonant, romanised: { lowercase: 'v', uppercase: 'V', }, ipa: 'β',
        rules: { allowed: { after: ["şüta", "þüta", "rüta"] } } },
    { name: 'ðema', type: CharacterType.Consonant, romanised: { lowercase: 'ð', uppercase: 'Đ', }, ipa: 'ð',
        rules: { allowed: { after: ["şüta", "þüta", "rüta"] } } },
    { name: 'çema', type: CharacterType.Consonant, romanised: { lowercase: 'ç', uppercase: 'Ç', }, ipa: 'tʃ',
        rules: { allowed: { after: ["şüta", "þüta", "rüta"] } } },

    { name: 'rüta', type: CharacterType.Consonant, romanised: { lowercase: 'r', uppercase: 'R', }, ipa: 'r',
        rules: { allowed: { after: ["şüta", "þüta", "çema", "ðema", "vema", "sema", "mema", "nema", "taþa", "daþa", "paþa", "baþa", "korsa", "gorsa"] } } },
    { name: 'þüta', type: CharacterType.Consonant, romanised: { lowercase: 'þ', uppercase: 'Ћ', }, ipa: 'θ',
        rules: { allowed: { after: ["şüta", "rüta", "çema", "ðema", "vema", "sema", "mema", "nema", "taþa", "daþa", "paþa", "baþa", "korsa", "gorsa"] } } },
    { name: 'şüta', type: CharacterType.Consonant, romanised: { lowercase: 'ş', uppercase: 'Ş', }, ipa: 'ʃ',
        rules: { allowed: { after: ["rüta", "þüta", "çema", "ðema", "vema", "sema", "mema", "nema", "taþa", "daþa", "paþa", "baþa", "korsa", "gorsa"] } } },
];

const orthography = { 
    alphabet 
};

export default orthography;
