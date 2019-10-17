import { StressPositions } from './enums';

const stress = {
    default: {
        primary: StressPositions.Second,
        secondary: StressPositions.Last,
    },
    rules: [
        {
            type: 'v',
            position: 0,
            primary: StressPositions.First,
        }
    ]
};

const phonotactics = {
    structure: ['?C', 'V', '?C'],
}

const phonology = { 
    stress,
    phonotactics,
};

export default phonology;
