import Ussurian from './index';

const ussurian = new Ussurian();

const word = ussurian.generateRoot();

console.log(word);

const typed = [];

word.flat().forEach((c, key) => {
    typed.push(key !== 0 ? c.romanised.lowercase  : c.romanised.uppercase);
})

console.log(typed.join(''));