import { INouns, IVerbs } from './interfaces';

const nounTemplate: INouns = {
    human: [''],
    entity: [''],
    cases: {
        nom: {
            singular: {
                first: [''],
                second: [''],
                third: [''],
                masculine: [''],
                feminine: [''],
            },
            minority: {
                first: [''],
                second: [''],
                third: [''],
                masculine: [''],
                feminine: [''],
            },
            majority: {
                first: [''],
                second: [''],
                third: [''],
                masculine: [''],
                feminine: [''],
            }
        },
        acc: {
            singular: {
                first: [''],
                second: [''],
                third: [''],
                masculine: [''],
                feminine: [''],
            },
            minority: {
                first: [''],
                second: [''],
                third: [''],
                masculine: [''],
                feminine: [''],
            },
            majority: {
                first: [''],
                second: [''],
                third: [''],
                masculine: [''],
                feminine: [''],
            }
        },
        dat: {
            singular: {
                first: [''],
                second: [''],
                third: [''],
                masculine: [''],
                feminine: [''],
            },
            minority: {
                first: [''],
                second: [''],
                third: [''],
                masculine: [''],
                feminine: [''],
            },
            majority: {
                first: [''],
                second: [''],
                third: [''],
                masculine: [''],
                feminine: [''],
            }
        },
        gen: {
            singular: {
                first: [''],
                second: [''],
                third: [''],
                masculine: [''],
                feminine: [''],
            },
            minority: {
                first: [''],
                second: [''],
                third: [''],
                masculine: [''],
                feminine: [''],
            },
            majority: {
                first: [''],
                second: [''],
                third: [''],
                masculine: [''],
                feminine: [''],
            }
        },
    },
    pronoun: false,
    suffixes: {
        common: [''],
        seasonal: true,
        demonstrative: [''],
        locative: [''],
        chronological: [''],
    }
}

const verbTemplate: IVerbs = {
    formal: {
        pst: {
            perf: {
                exp: [''],
                rep: [''],
                hsy: [''],
                ass: [''],
            },
            prog: {
                imp: [''],
                spec: [''],
                cap: [''],
            },
            hist: {
                exp: [''],
                rep: [''],
                hsy: [''],
                ass: [''],
            },
            rec: {
                exp: [''],
                rep: [''],
                hsy: [''],
                ass: [''],
            }
        },
        pres: {
            prog: {
                ass: [''],
                spec: [''],
                cap: [''],
                imp: [''],
            }
        },
        fut: {
            imm: {
                ass: [''],
                imp: [''],
            },
            prog: {
                cap: [''],
            },
            perfprog: {
                ass: [''],
            },
        }
    },
    informal: {
        pst: {
            simp: [''],
            prog: [''],
            perf: [''],
            perfprog: [''],
        },
        pres: {
            simp: [''],
            prog: [''],
            perf: [''],
            perfprog: [''],
        },
        fut: {
            simp: [''],
            prog: [''],
            perf: [''],
            perfprog: [''], 
        }
    }
};

export { nounTemplate, verbTemplate }