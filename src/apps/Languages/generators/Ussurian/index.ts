import {
    IAlphabet,
    IStresses,
    IPhonotactics,
    INoun,
    IVerb,
    IAdverb,
    IAdjective,
    ILexeme,
} from './interfaces';

import {
    CharacterType,
} from './enums';

import Orthography from './orthography';
import Phonology from './phonology';
import Morphology from './morphology';

import { nounTemplate, verbTemplate } from './templates';


interface IUssurianLexemeOptions {
    manual?: IAlphabet[][];
    params?: {
        syllables?: number;
    };
}

export default class Ussurian {

    private alphabet: IAlphabet[];
    private stress: IStresses;
    private phonotactics: IPhonotactics;
    private Noun: INoun;
    private Verb: IVerb;
    private Adverb: IAdverb;
    private Adjective: IAdjective;

    private root: IAlphabet[][];
    private options: IUssurianLexemeOptions;

    constructor() {
        this.alphabet = Orthography.alphabet;
        this.stress = Phonology.stress;
        this.phonotactics = Phonology.phonotactics;

        this.Noun = Morphology.nouns;
        this.Verb = Morphology.verbs;
        this.Adverb = Morphology.adverbs;
        this.Adjective = Morphology.adjectives;
    }

    public generateLexeme(options: IUssurianLexemeOptions): ILexeme {
        this.options = options;

        this.root = this.options.manual ? this.options.manual : this.generateRoot();
        
        const nouns = this.generateNouns();
        const verbs = this.generateVerbs();
        const adverbs = this.generateAdverbs();
        const adjectives = this.generateAdjectives();

        let lexeme: ILexeme = {
            root: this.root,
            nouns,
            verbs,
            adverbs,
            adjectives,
        };

        return lexeme;
    }
    
    /* GENERATORS */

    public generateRoot(): IAlphabet[][] {
        this.options = {};

        let root: IAlphabet[][] = [];

        const numberOfSyllables = this.options.params && this.options.params.syllables 
            ? this.options.params.syllables : this.getRandomNumber(1, 4);

        for (let s = 0; s < numberOfSyllables; s++) {
            const previousChar = s !== 0 ? root[s-1][root[s-1].length-1].type : undefined;
            root.push(this.generateSyllable(previousChar));
        }

        return this.FixWord(root);
    }

    private generateSyllable(prev?: CharacterType): IAlphabet[] {
        let syllable: IAlphabet[] = [];

        const random = this.getRandomNumber(1, 9);
        let numberOfCharacters: number;
        switch (random) {
            case 1:
                numberOfCharacters = 1;
                break;
            case 2:
            case 3:
                numberOfCharacters = 2;
                break;
            case 4:
            case 5:
            case 6:
            case 7:
                numberOfCharacters = 3;
                break;
            case 8:
                numberOfCharacters = 4;
                break;
            case 9:
                numberOfCharacters = 5;
                break;
        }

        switch (numberOfCharacters) {
            case 1:
                // V
                syllable.push(prev === CharacterType.Vowel ?
                    this.getCharacter(CharacterType.Consonant) : this.getCharacter(CharacterType.Vowel));
                break;
            case 2:
                // VC / CV
                const TwoFirst: IAlphabet = prev === CharacterType.Vowel ?
                    this.getCharacter(CharacterType.Consonant) : this.getCharacter();
                syllable.push(TwoFirst);

                const TwoSecond: IAlphabet = TwoFirst.type === CharacterType.Vowel 
                    ? this.getCharacter(CharacterType.Consonant) : this.getCharacter(CharacterType.Vowel)
                syllable.push(TwoSecond);
                break;
            case 3:
                // VCV / CVC / CCV / VCC
                const ThreeFirst: IAlphabet = prev === CharacterType.Vowel ?
                    this.getCharacter(CharacterType.Consonant) : this.getCharacter();
                syllable.push(ThreeFirst);

                let ThreeSecond: IAlphabet;
                // VC
                if (ThreeFirst.type === CharacterType.Vowel) {
                    ThreeSecond = this.getCharacter(CharacterType.Consonant)
                } else {
                    let ThreeSecondValid = false;
                    while (!ThreeSecondValid) {
                        ThreeSecond = this.getCharacter();
                        // CV
                        if (ThreeSecond.type === CharacterType.Vowel) {
                            ThreeSecondValid = true;
                        }
                        // If two consonants, If allowed rules exist on previous character
                        else if (ThreeSecond.rules && ThreeSecond.rules.allowed && ThreeSecond.rules.allowed.after 
                                && ThreeSecond.rules.allowed.after.includes(ThreeFirst.name)) {
                                ThreeSecondValid = true;
                        }
                    }
                }
                syllable.push(ThreeSecond);

                let ThreeThird: IAlphabet;
                let ThreeThirdValid = false;
                while (!ThreeThirdValid) {
                    // VCC / VCV
                    if (ThreeFirst.type === CharacterType.Vowel && ThreeSecond.type === CharacterType.Consonant) {
                        ThreeThird = this.getCharacter();
                        // VCV
                        if (ThreeThird.type === CharacterType.Vowel) {
                            ThreeThirdValid = true;
                        // VCC
                        } else {
                            if (ThreeThird.rules && ThreeThird.rules.allowed && ThreeThird.rules.allowed.after 
                                && ThreeThird.rules.allowed.after.includes(ThreeSecond.name)) {
                                ThreeThirdValid = true;
                            }
                        }
                        
                    }
                    // CCV
                    else if (ThreeFirst.type === CharacterType.Consonant && ThreeSecond.type === CharacterType.Consonant) {
                        ThreeThird = this.getCharacter(CharacterType.Vowel);
                        ThreeThirdValid = true;
                    // CVC
                    } else if (ThreeFirst.type === CharacterType.Consonant && ThreeSecond.type === CharacterType.Vowel) {
                        ThreeThird = this.getCharacter(CharacterType.Consonant);
                        ThreeThirdValid = true;
                    }

                }
                syllable.push(ThreeThird);
                
                break;
            case 4:
                // CCVC / CVCC
                const FourFirst: IAlphabet = this.getCharacter(CharacterType.Consonant);
                syllable.push(FourFirst);

                let FourSecondValid = false;
                let FourSecond: IAlphabet;
                while (!FourSecondValid) {
                    FourSecond = this.getCharacter();
                    // If two consonants, If allowed rules exist on previous character
                    if (FourSecond.type === CharacterType.Vowel) {
                        FourSecondValid = true;
                    }
                    else {
                        if (FourSecond.rules && FourSecond.rules.allowed && FourSecond.rules.allowed.after 
                            && FourSecond.rules.allowed.after.includes(FourFirst.name)) {
                            FourSecondValid = true;
                        }
                    }
                }

                syllable.push(FourSecond);

                let FourThird: IAlphabet;
                if (FourSecond.type === CharacterType.Vowel) {
                    FourThird = this.getCharacter(CharacterType.Consonant);
                } else {
                    FourThird = this.getCharacter(CharacterType.Vowel);
                }
                syllable.push(FourThird);

                let FourFourth: IAlphabet;
                let FourFourthValid = false;
                while (!FourFourthValid) {
                    FourFourth = this.getCharacter(CharacterType.Consonant);
                    // CCVC
                    if (FourThird.type === CharacterType.Vowel) {
                        FourFourthValid = true;
                    }
                    // CVCC
                    else {
                        if (FourFourth.rules && FourFourth.rules.allowed && FourFourth.rules.allowed.after 
                            && FourFourth.rules.allowed.after.includes(FourThird.name)) {
                                FourFourthValid = true;
                        }
                    }
                }
                    
                syllable.push(FourFourth);


                break;
            case 5:
                // CCVCC
                const FiveFirst: IAlphabet = this.getCharacter(CharacterType.Consonant); 
                syllable.push(FiveFirst);

                let FiveSecond: IAlphabet;
                let FiveSecondValid = false;
                while (!FiveSecondValid) {
                    FiveSecond = this.getCharacter(CharacterType.Consonant);
                    // If two consonants, If allowed rules exist on previous character
                    if (FiveSecond.rules && FiveSecond.rules.allowed && FiveSecond.rules.allowed.after 
                        && FiveSecond.rules.allowed.after.includes(FiveFirst.name)) {
                        FiveSecondValid = true;
                    }
                }
                syllable.push(FiveSecond);

                const FiveThird: IAlphabet = this.getCharacter(CharacterType.Vowel);
                syllable.push(FiveThird);

                const FiveFourth: IAlphabet = this.getCharacter(CharacterType.Consonant);
                syllable.push(FiveFourth);

                let FiveFifth: IAlphabet;
                let FiveFifthValid = false;
                while (!FiveFifthValid) {
                    FiveFifth = this.getCharacter(CharacterType.Consonant);
                    //  If allowed rules exist on previous character
                    if (FiveFifth.rules && FiveFifth.rules.allowed && FiveFifth.rules.allowed.after
                        && FiveFifth.rules.allowed.after.includes(FiveFourth.name)) {
                        FiveFifthValid = true;
                    }
                }
                syllable.push(FiveFifth);

                break;
        }

        return syllable;
    }

    private generateNouns(): ILexemeNoun {
        let nouns: ILexemeNoun = nounTemplate;

        return nouns;
    }

    private generateVerbs(): IVerbs {
        let verbs: IVerbs = verbTemplate;

        return verbs;
    }

    private generateAdjectives(): IAdjectives {
        let adjectives: IAdjectives;

        adjectives = {
            prefix: [''],
        };

        return adjectives;
    }

    private generateAdverbs(): IAdverbs {
        let adverbs: IAdverbs;

        adverbs = {
            prefix: [''],
        };

        return adverbs;
    }

    private getCharacter(type: CharacterType = CharacterType.Random): IAlphabet {
        let character: IAlphabet;

        switch(type) {
            case (CharacterType.Consonant):
                character = this.getConsonant();
                break;
            case (CharacterType.Vowel):
                character = this.getVowel();
                break;
            default:
                if (this.getRandomNumber(1,6) >= 3) {
                    character = this.getConsonant();
                } else {
                    character = this.getVowel();
                }
                break;
        }

        return character;
    }

    private getConsonant(): IAlphabet {
        const consonants = this.alphabet.filter(character => character.type === CharacterType.Consonant );
        const key = this.getRandomNumber(0, consonants.length);

        let consonant: IAlphabet = consonants[key];

        return consonant;
    }

    private getVowel(): IAlphabet {
        const vowels = this.alphabet.filter(character => character.type === CharacterType.Vowel );
        const key = this.getRandomNumber(0, vowels.length);

        let vowel: IAlphabet = vowels[key];

        return vowel;
    }

    private getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }

    /*
    * Returns IAlphabet[] as some repair strategies use multiple characters
    */
    private FixWord(word: IAlphabet[][]): IAlphabet[][] {
        return word.map((syllable: IAlphabet[], key: number) => {
            if (key === 0) return syllable;

            let newSyllable = { ...syllable };

            // Check double consonant && consecutive vowels
            const prevWord = word[key-1];
            if ((prevWord[prevWord.length-1].type === CharacterType.Consonant && prevWord[prevWord.length-1].name === syllable[0].name)
                || prevWord[prevWord.length-1].type === CharacterType.Vowel && syllable[0].type === CharacterType.Vowel) {
                    newSyllable.shift();
                }

            return syllable;
        });
    }
}