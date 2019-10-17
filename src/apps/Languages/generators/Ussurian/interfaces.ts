// The name (as a string) of an alphabetical character
type Alphabetical = string;

import {
    CharacterType,
    StressPositions,
} from './enums';

/* ********   ALPHABET   ******** */

export interface IAlphabet {
    name: string;
    type: CharacterType;
    romanised: {
        lowercase: string;
        uppercase?: string;
    };
    ipa: string;
    rules?: IAlphabetRules;
}

interface IAlphabetRules {
    // Only allow specific consonant clusters
    allowed: {
        before?: Alphabetical[],
        after?: Alphabetical[],
    };
}

/* ********   WORDS   ******** */

export interface ILexeme {
    root: IAlphabet[][],
    properties: ILexemeOptions;
}

interface ILexemeOptions {
    isHuman: boolean;
    isEntity: boolean;
    isSeasonal: boolean;
    isVerb: boolean;
    isAdverb: boolean;
    isAdjective: boolean;
}

/* ********   NOUNS   ******** */

export interface INoun {
    case: {
        nom: INounCases;
        acc: INounCases;
        dat: INounCases;
        gen: INounCases;
    };
    prefixes: {
        human: Alphabetical[];
        entity: Alphabetical[];
    };
    suffixes: {
        seasonal: {
            blessed: Alphabetical[];
            unblessed: Alphabetical[];
            winter: Alphabetical[];
            spring: Alphabetical[];
            summer: Alphabetical[];
            autumn: Alphabetical[];
        };
        determiners: { [ key: string]: INounDeterminers };
    }
}

interface INounCases {
    singular: INounCase;
    dual: INounCase;
    plural: INounCase
}

interface INounCase {
    masculine: Alphabetical[];
    feminine: Alphabetical[];
    first: Alphabetical[];
    second: Alphabetical[];
    third: Alphabetical[];
}

interface INounDeterminers {
    label: string;
    determinative: {
        meaning: string;
        suffix: Alphabetical[];
    };
    locative: {
        meaning: string;
        suffix: Alphabetical[];
    };
    ablative: {
        meaning: string;
        suffix: Alphabetical[];
    };
    temporal: {
        meaning: string;
        suffix: Alphabetical[];
    };
    qualitative: {
        meaning: string;
        suffix: Alphabetical[];
    };
}

/* ********   VERBS   ******** */

export interface IVerb {
    tense: {
        past: Alphabetical;
        present: Alphabetical;
        future: Alphabetical;
    };
    modality: {
        assumptive: Alphabetical;
        speculative: Alphabetical;
        imperative: Alphabetical;
        capability: Alphabetical;
    };
    aspect: {
        simple: Alphabetical;
        progressive: Alphabetical;
        perfective: Alphabetical;
        perfectProgressive: Alphabetical;
    };
}

/* ********   ADVERBS & ADJECTIVES   ******** */

export interface IAdverb {
    prepositions: IPreposition[];
}

export interface IAdjective {
    prepositions: IPreposition[];
}

interface IPreposition {
    word: Alphabetical[];
    meaning: string;
}

/* ********   GRAMMATICAL RULES   ******** */

export interface IStresses {
    default: {
        primary: StressPositions;
        secondary: StressPositions; //syllable
    };
    rules: IStressRule[]
}

interface IStressRule {
    type?: string;
    syllables?: number;
    morpheme?: string[];
    position?: number;
    primary?: StressPositions;
    secondary?:StressPositions;
}

export interface IPhonotactics {
    structure: string[];
}