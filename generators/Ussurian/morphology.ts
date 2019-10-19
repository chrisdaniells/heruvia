import { INoun, IVerb, IAdverb, IAdjective } from './interfaces';

const Noun: INoun = {
    case: {
        nom: {
            singular: {
                masculine: ['korsa', 'ãda'],
                feminine: ['taþa', 'ãda'],
                first: ['baþa', 'ãda'],
                second: ['daþa', 'ãda'],
                third: ['paþa', 'ãda'],
            },
            dual: {
                masculine: ['korsa', 'ãda', 'sema'],
                feminine: ['taþa', 'ãda', 'sema'],
                first: ['baþa', 'ãda', 'sema'],
                second: ['daþa', 'ãda', 'sema'],
                third: ['paþa', 'ãda', 'sema'],
            },
            plural: {
                masculine: ['korsa', 'ãda', 'þüta'],
                feminine: ['taþa', 'ãda', 'þüta'],
                first: ['baþa', 'ãda', 'þüta'],
                second: ['daþa', 'ãda', 'þüta'],
                third: ['paþa', 'ãda', 'þüta'],
            }
        },
        acc: {
            singular: {
                masculine: ['korsa', 'ada'],
                feminine: ['taþa', 'ada'],
                first: ['baþa', 'ada'],
                second: ['daþa', 'ada'],
                third: ['paþa', 'ada'],
            },
            dual: {
                masculine: ['korsa', 'ada', 'sema'],
                feminine: ['taþa', 'ada', 'sema'],
                first: ['baþa', 'ada', 'sema'],
                second: ['daþa', 'ada', 'sema'],
                third: ['paþa', 'ada', 'sema'],
            },
            plural: {
                masculine: ['korsa', 'ada', 'þüta'],
                feminine: ['taþa', 'ada', 'þüta'],
                first: ['baþa', 'ada', 'þüta'],
                second: ['daþa', 'ada', 'þüta'],
                third: ['paþa', 'ada', 'þüta'],
            }
        },
        dat: {
            singular: {
                masculine: ['korsa', 'ẽga'],
                feminine: ['taþa', 'ẽga'],
                first: ['baþa', 'ẽga'],
                second: ['daþa', 'ẽga'],
                third: ['paþa', 'ẽga'],
            },
            dual: {
                masculine: ['korsa', 'ẽga', 'sema'],
                feminine: ['taþa', 'ẽga', 'sema'],
                first: ['baþa', 'ẽga', 'sema'],
                second: ['daþa', 'ẽga', 'sema'],
                third: ['paþa', 'ẽga', 'sema'],
            },
            plural: {
                masculine: ['korsa', 'ẽga', 'þüta'],
                feminine: ['taþa', 'ẽga', 'þüta'],
                first: ['baþa', 'ẽga', 'þüta'],
                second: ['daþa', 'ẽga', 'þüta'],
                third: ['paþa', 'ẽga', 'þüta'],
            }
        },
        gen: {
            singular: {
                masculine: ['korsa', 'ösa'],
                feminine: ['taþa', 'ösa'],
                first: ['baþa', 'ösa'],
                second: ['daþa', 'ösa'],
                third: ['paþa', 'ösa'],
            },
            dual: {
                masculine: ['korsa', 'ösa', 'sema'],
                feminine: ['taþa', 'ösa', 'sema'],
                first: ['baþa', 'ösa', 'sema'],
                second: ['daþa', 'ösa', 'sema'],
                third: ['paþa', 'ösa', 'sema'],
            },
            plural: {
                masculine: ['korsa', 'ösa', 'þüta'],
                feminine: ['taþa', 'ösa', 'þüta'],
                first: ['baþa', 'ösa', 'þüta'],
                second: ['daþa', 'ösa', 'þüta'],
                third: ['paþa', 'ösa', 'þüta'],
            }
        }
    },
    prefixes: {
        human: ['uba', 'taþa'],
        entity: ['ega', 'taþa'],
    },
    suffixes: {
        seasonal: {
            blessed: ['sema', 'ima', 'nema'],
            unblessed: ['sema', 'ima', 'korsa'],
            summer: ['sema', 'ega', 'taþa'],
            winter: ['sema', 'osa', 'korsa'],
            autumn: ['sema', 'ada', 'vema'],
            spring: ['sema', 'uba', 'nema'],
        },
        determiners: {
            this: {
                label: "This",
                determinative:  { meaning: 'This', suffix: ['ega', 'mema', 'õsa'] },
                locative:       { meaning: 'Here', suffix: ['ösa', 'mema', 'õsa'] },
                ablative:       { meaning: 'This Way', suffix: ['ĩma', 'mema', 'õsa'] },
                temporal:       { meaning: 'Now', suffix: ['uba', 'mema', 'õsa'] },
                qualitative:    { meaning: 'This degree', suffix: ['ãda', 'mema', 'õsa'] },
            },
            that: {
                label: "That",
                determinative:  { meaning: 'That', suffix: ['ega', 'mema', 'ĩma'] },
                locative:       { meaning: 'There', suffix: ['ösa', 'mema', 'ĩma'] },
                ablative:       { meaning: 'That Way', suffix: ['ĩma', 'mema', 'ĩma'] },
                temporal:       { meaning: 'Then', suffix: ['uba', 'mema', 'ĩma'] },
                qualitative:    { meaning: 'That degree', suffix: ['ãda', 'mema', 'ĩma'] },
            },
            every: {
                label: "Every",
                determinative:  { meaning: 'Every/All', suffix: ['ega', 'nema', 'osa'] },
                locative:       { meaning: 'Everywhere', suffix: ['ösa', 'nema', 'osa'] },
                ablative:       { meaning: 'Every way/Any way/All ways', suffix: ['ĩma', 'nema', 'osa'] },
                temporal:       { meaning: 'Every time/All the time', suffix: ['uba', 'nema', 'osa'] },
                qualitative:    { meaning: 'Total/Sum', suffix: ['ãda', 'nema', 'osa'] },
            },
            some: {
                label: "Some (unspecified)",
                determinative:  { meaning: 'Some', suffix: ['ega', 'nema', 'ega'] },
                locative:       { meaning: 'Somewhere', suffix: ['ösa', 'nema', 'ega'] },
                ablative:       { meaning: 'Some way', suffix: ['ĩma', 'nema', 'ega'] },
                temporal:       { meaning: 'Sometime/Around', suffix: ['uba', 'nema', 'ega'] },
                qualitative:    { meaning: 'Unspecified/Unknown', suffix: ['ãda', 'nema', 'ega'] },
            },
            somex: {
                label: "Some (specified)",
                determinative:  { meaning: 'Plenty/Many', suffix: ['ega', 'nema', 'õsa'] },
                locative:       { meaning: 'Where', suffix: ['ösa', 'nema', 'õsa'] },
                ablative:       { meaning: 'Around (motion)', suffix: ['ĩma', 'nema', 'õsa'] },
                temporal:       { meaning: 'Until', suffix: ['uba', 'nema', 'õsa'] },
                qualitative:    { meaning: 'Sufficient/Standard', suffix: ['ãda', 'nema', 'õsa'] },
            },
            any: {
                label: "Any",
                determinative:  { meaning: 'Any', suffix: ['ega', 'nema', 'üba'] },
                locative:       { meaning: 'Anywhere', suffix: ['ösa', 'nema', 'üba'] },
                ablative:       { meaning: 'Any way', suffix: ['ĩma', 'nema', 'üba'] },
                temporal:       { meaning: 'Any time', suffix: ['uba', 'nema', 'üba'] },
                qualitative:    { meaning: 'Any degree', suffix: ['ãda', 'nema', 'üba'] },
            },
            none: {
                label: "None",
                determinative:  { meaning: 'No-/None-/Without', suffix: ['ega', 'nema', 'ũba'] },
                locative:       { meaning: 'Nowhere', suffix: ['ösa', 'nema', 'ũba'] },
                ablative:       { meaning: 'Stationary', suffix: ['ĩma', 'nema', 'ũba'] },
                temporal:       { meaning: 'Never', suffix: ['uba', 'nema', 'ũba'] },
                qualitative:    { meaning: 'No degree', suffix: ['ãda', 'nema', 'ũba'] },
            },
            top: {
                label: "Top",
                determinative:  { meaning: 'Best', suffix: ['ega', 'sema', 'osa'] },
                locative:       { meaning: 'On top', suffix: ['ösa', 'sema', 'osa'] },
                ablative:       { meaning: 'Onto', suffix: ['ĩma', 'sema', 'osa'] },
                temporal:       { meaning: 'Latest', suffix: ['uba', 'sema', 'osa'] },
                qualitative:    { meaning: 'Most', suffix: ['ãda', 'sema', 'osa'] },
            },
            bottom: {
                label: "Bottom",
                determinative:  { meaning: 'Worst', suffix: ['ega', 'sema', 'ũba'] },
                locative:       { meaning: 'Underneath', suffix: ['ösa', 'sema', 'ũba'] },
                ablative:       { meaning: 'Go beneath', suffix: ['ĩma', 'sema', 'ũba'] },
                temporal:       { meaning: 'Earliest', suffix: ['uba', 'sema', 'ũba'] },
                qualitative:    { meaning: 'Least', suffix: ['ãda', 'sema', 'ũba'] },
            },
            above: {
                label: "Above",
                determinative:  { meaning: 'Better', suffix: ['ega', 'vema', 'osa'] },
                locative:       { meaning: 'Above', suffix: ['ösa', 'vema', 'osa'] },
                ablative:       { meaning: 'Ascend', suffix: ['ĩma', 'vema', 'osa'] },
                temporal:       { meaning: 'Late', suffix: ['uba', 'vema', 'osa'] },
                qualitative:    { meaning: 'More', suffix: ['ãda', 'vema', 'osa'] },
            },
            below: {
                label: "Below",
                determinative:  { meaning: 'Lesser', suffix: ['ega', 'vema', 'osa'] },
                locative:       { meaning: 'Below', suffix: ['ösa', 'vema', 'osa'] },
                ablative:       { meaning: 'Descend', suffix: ['ĩma', 'vema', 'osa'] },
                temporal:       { meaning: 'Early', suffix: ['uba', 'vema', 'osa'] },
                qualitative:    { meaning: 'Less', suffix: ['ãda', 'vema', 'osa'] },
            },
            before: {
                label: "Before",
                determinative:  { meaning: 'First', suffix: ['ega', 'ðema', 'osa'] },
                locative:       { meaning: 'Before', suffix: ['ösa', 'ðema', 'osa'] },
                ablative:       { meaning: 'Forwards', suffix: ['ĩma', 'ðema', 'osa'] },
                temporal:       { meaning: 'Previously', suffix: ['uba', 'ðema', 'osa'] },
                qualitative:    { meaning: 'Too little/too few', suffix: ['ãda', 'ðema', 'osa'] },
            },
            beside: {
                label: "Beside",
                determinative:  { meaning: 'With', suffix: ['ega', 'ðema', 'ïma'] },
                locative:       { meaning: 'Beside/Next to/Adjacent', suffix: ['ösa', 'ðema', 'ïma'] },
                ablative:       { meaning: 'Along', suffix: ['ĩma', 'ðema', 'ïma'] },
                temporal:       { meaning: 'While/Concurrent', suffix: ['uba', 'ðema', 'ïma'] },
                qualitative:    { meaning: 'Equal/Equivilent (hierarchical)', suffix: ['ãda', 'ðema', 'ïma'] },
            },
            between: {
                label: "Between",
                determinative:  { meaning: 'Among', suffix: ['ega', 'ðema', 'õsa'] },
                locative:       { meaning: 'Between', suffix: ['ösa', 'ðema', 'õsa'] },
                ablative:       { meaning: 'Through/Throughout', suffix: ['ĩma', 'ðema', 'õsa'] },
                temporal:       { meaning: 'During', suffix: ['uba', 'ðema', 'õsa'] },
                qualitative:    { meaning: 'Average', suffix: ['ãda', 'ðema', 'õsa'] },
            },
            after: {
                label: "After",
                determinative:  { meaning: 'Last', suffix: ['ega', 'ðema', 'ũba'] },
                locative:       { meaning: 'Behind', suffix: ['ösa', 'ðema', 'ũba'] },
                ablative:       { meaning: 'Backwards', suffix: ['ĩma', 'ðema', 'ũba'] },
                temporal:       { meaning: 'Afterwards', suffix: ['uba', 'ðema', 'ũba'] },
                qualitative:    { meaning: 'Too much/Too many', suffix: ['ãda', 'ðema', 'ũba'] },
            },
            near: {
                label: "Near",
                determinative:  { meaning: 'Similar', suffix: ['ega', 'şüta', 'osa'] },
                locative:       { meaning: 'Near', suffix: ['ösa', 'şüta', 'osa'] },
                ablative:       { meaning: 'Nearing/Nearer/Closer', suffix: ['ĩma', 'şüta', 'osa'] },
                temporal:       { meaning: 'Near', suffix: ['uba', 'şüta', 'osa'] },
                qualitative:    { meaning: 'Few', suffix: ['ãda', 'şüta', 'osa'] },
            },
            at: {
                label: "At",
                determinative:  { meaning: 'Same', suffix: ['ega', 'şüta', 'õsa'] },
                locative:       { meaning: 'At', suffix: ['ösa', 'şüta', 'õsa'] },
                ablative:       { meaning: 'Arrive', suffix: ['ĩma', 'şüta', 'õsa'] },
                temporal:       { meaning: 'When', suffix: ['uba', 'şüta', 'õsa'] },
                qualitative:    { meaning: 'A', suffix: ['ãda', 'şüta', 'õsa'] },
            },
            far: {
                label: "Far",
                determinative:  { meaning: 'Different', suffix: ['ega', 'şüta', 'ũba'] },
                locative:       { meaning: 'Far', suffix: ['ösa', 'şüta', 'ũba'] },
                ablative:       { meaning: 'Further/Furthering', suffix: ['ĩma', 'şüta', 'ũba'] },
                temporal:       { meaning: 'Far', suffix: ['uba', 'şüta', 'ũba'] },
                qualitative:    { meaning: 'Many', suffix: ['ãda', 'şüta', 'ũba'] },
            },
            together: {
                label: "Together",
                determinative:  { meaning: 'Together/Adjoined', suffix: ['ega', 'þüta', 'osa'] },
                locative:       { meaning: 'Against', suffix: ['ösa', 'þüta', 'osa'] },
                ablative:       { meaning: 'Aligned', suffix: ['ĩma', 'þüta', 'osa'] },
                temporal:       { meaning: 'Recent', suffix: ['uba', 'þüta', 'osa'] },
                qualitative:    { meaning: 'Grouped', suffix: ['ãda', 'þüta', 'osa'] },
            },
            opposite: {
                label: "Opposite",
                determinative:  { meaning: 'Separate/Separated', suffix: ['ega', 'þüta', 'ũba'] },
                locative:       { meaning: 'Opposite', suffix: ['ösa', 'þüta', 'ũba'] },
                ablative:       { meaning: 'Across', suffix: ['ĩma', 'þüta', 'ũba'] },
                temporal:       { meaning: 'Distant', suffix: ['uba', 'þüta', 'ũba'] },
                qualitative:    { meaning: 'Other', suffix: ['ãda', 'þüta', 'ũba'] },
            },
            in: {
                label: "In",
                determinative:  { meaning: 'Including', suffix: ['ega', 'rüta', 'osa'] },
                locative:       { meaning: 'In/Inside', suffix: ['ösa', 'rüta', 'osa'] },
                ablative:       { meaning: 'Into/Inwards', suffix: ['ĩma', 'rüta', 'osa'] },
                temporal:       { meaning: 'In time', suffix: ['uba', 'rüta', 'osa'] },
                qualitative:    { meaning: 'Included in degree', suffix: ['ãda', 'rüta', 'osa'] },
            },
            out: {
                label: "Out",
                determinative:  { meaning: 'Excluding', suffix: ['ega', 'rüta', 'ũba'] },
                locative:       { meaning: 'Out/Outside', suffix: ['ösa', 'rüta', 'ũba'] },
                ablative:       { meaning: 'Out of/Outwards', suffix: ['ĩma', 'rüta', 'ũba'] },
                temporal:       { meaning: 'Out of time', suffix: ['uba', 'rüta', 'ũba'] },
                qualitative:    { meaning: 'Excluded from degree', suffix: ['ãda', 'rüta', 'ũba'] },
            },
            to: {
                label: "To",
                determinative:  { meaning: 'Referring to', suffix: ['ega', 'sema', 'osa'] },
                locative:       { meaning: 'To', suffix: ['ösa', 'sema', 'osa'] },
                ablative:       { meaning: 'Towards', suffix: ['ĩma', 'sema', 'osa'] },
                temporal:       { meaning: 'Soon', suffix: ['uba', 'sema', 'osa'] },
                qualitative:    { meaning: 'To the degree', suffix: ['ãda', 'sema', 'osa'] },
            },
            from: {
                label: "From",
                determinative:  { meaning: 'Taken from', suffix: ['ega', 'sema', 'ũba'] },
                locative:       { meaning: 'Away from', suffix: ['ösa', 'sema', 'ũba'] },
                ablative:       { meaning: 'Away/Gone', suffix: ['ĩma', 'sema', 'ũba'] },
                temporal:       { meaning: 'Later', suffix: ['uba', 'sema', 'ũba'] },
                qualitative:    { meaning: 'From from degree', suffix: ['ãda', 'sema', 'ũba'] },
            },
        },
    },
}

const Verb: IVerb = {
    tense: {
        past: 'vema',
        present: 'þüta',
        future: 'çema',
    }, 
    modality: {
        assumptive: 'ïma',
        speculative:'ada',
        imperative: 'üba',
        capability: 'ẽga',
    },
    aspect: {
        simple: 'taþa',
        progressive: 'paþa',
        perfective: 'baþa',
        perfectProgressive: 'daþa',
    }
}

const Adverb: IAdverb = {
    prepositions: [

    ],
}

const Adjective: IAdjective = {
    prepositions: [

    ],
}

const Morphology = { 
    Noun,
    Verb,
    Adverb,
    Adjective,
};

export default Morphology;