"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _enums = require("./enums");

var _orthography = _interopRequireDefault(require("./orthography"));

var _phonology = _interopRequireDefault(require("./phonology"));

var _morphology = _interopRequireDefault(require("./morphology"));

var _templates = require("./templates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ussurian =
/*#__PURE__*/
function () {
  function Ussurian() {
    _classCallCheck(this, Ussurian);

    this.alphabet = _orthography["default"].alphabet;
    this.stress = _phonology["default"].stress;
    this.phonotactics = _phonology["default"].phonotactics;
    this.nouns = _morphology["default"].nouns;
    this.verbs = _morphology["default"].verbs;
    this.adverbs = _morphology["default"].adverbs;
    this.adjectives = _morphology["default"].adjectives;
    this.vc = 0;
  }

  _createClass(Ussurian, [{
    key: "generateLexeme",
    value: function generateLexeme(options) {
      this.options = options;
      this.root = this.options.manual ? this.options.manual : this.generateRoot();
      var nouns = this.generateNouns();
      var verbs = this.generateVerbs();
      var adverbs = this.generateAdverbs();
      var adjectives = this.generateAdjectives();
      var lexeme = {
        root: this.root,
        nouns: nouns,
        verbs: verbs,
        adverbs: adverbs,
        adjectives: adjectives
      };
      return lexeme;
    }
    /* GENERATORS */

  }, {
    key: "generateRoot",
    value: function generateRoot() {
      this.options = {};
      var root = [];
      var numberOfSyllables = this.options.params !== undefined && this.options.params.syllables ? this.options.params.syllables : this.getRandomNumber(1, 4);

      for (var s = 0; s < numberOfSyllables; s++) {
        var previousChar = s !== 0 ? root[s - 1][root[s - 1].length - 1].type : undefined;
        root.push(this.generateSyllable(previousChar));
      }

      return this.FixWord(root);
    }
  }, {
    key: "generateSyllable",
    value: function generateSyllable(prev) {
      var syllable = [];
      var random = this.getRandomNumber(1, 9);
      var numberOfCharacters;

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
          syllable.push(prev === _enums.CharacterType.Vowel ? this.getCharacter(_enums.CharacterType.Consonant) : this.getCharacter(_enums.CharacterType.Vowel));
          break;

        case 2:
          // VC / CV
          var TwoFirst = prev === _enums.CharacterType.Vowel ? this.getCharacter(_enums.CharacterType.Consonant) : this.getCharacter();
          syllable.push(TwoFirst);
          var TwoSecond = TwoFirst.type === _enums.CharacterType.Vowel ? this.getCharacter(_enums.CharacterType.Consonant) : this.getCharacter(_enums.CharacterType.Vowel);
          syllable.push(TwoSecond);
          break;

        case 3:
          // VCV / CVC / CCV / VCC
          var ThreeFirst = prev === _enums.CharacterType.Vowel ? this.getCharacter(_enums.CharacterType.Consonant) : this.getCharacter();
          syllable.push(ThreeFirst);
          var ThreeSecond; // VC

          if (ThreeFirst.type === _enums.CharacterType.Vowel) {
            ThreeSecond = this.getCharacter(_enums.CharacterType.Consonant);
          } else {
            var ThreeSecondValid = false;

            while (!ThreeSecondValid) {
              ThreeSecond = this.getCharacter(); // CV

              if (ThreeSecond.type === _enums.CharacterType.Vowel) {
                ThreeSecondValid = true;
              } // If two consonants, If allowed rules exist on previous character
              else if (ThreeSecond.rules && ThreeSecond.rules.allowed && ThreeSecond.rules.allowed.after && ThreeSecond.rules.allowed.after.includes(ThreeFirst.name)) {
                  ThreeSecondValid = true;
                }
            }
          }

          syllable.push(ThreeSecond);
          var ThreeThird;
          var ThreeThirdValid = false;

          while (!ThreeThirdValid) {
            // VCC / VCV
            if (ThreeFirst.type === _enums.CharacterType.Vowel && ThreeSecond.type === _enums.CharacterType.Consonant) {
              ThreeThird = this.getCharacter(); // VCV

              if (ThreeThird.type === _enums.CharacterType.Vowel) {
                ThreeThirdValid = true; // VCC
              } else {
                if (ThreeThird.rules && ThreeThird.rules.allowed && ThreeThird.rules.allowed.after && ThreeThird.rules.allowed.after.includes(ThreeSecond.name)) {
                  ThreeThirdValid = true;
                }
              }
            } // CCV
            else if (ThreeFirst.type === _enums.CharacterType.Consonant && ThreeSecond.type === _enums.CharacterType.Consonant) {
                ThreeThird = this.getCharacter(_enums.CharacterType.Vowel);
                ThreeThirdValid = true; // CVC
              } else if (ThreeFirst.type === _enums.CharacterType.Consonant && ThreeSecond.type === _enums.CharacterType.Vowel) {
                ThreeThird = this.getCharacter(_enums.CharacterType.Consonant);
                ThreeThirdValid = true;
              }
          }

          syllable.push(ThreeThird);
          break;

        case 4:
          // CCVC / CVCC
          var FourFirst = this.getCharacter(_enums.CharacterType.Consonant);
          syllable.push(FourFirst);
          var FourSecondValid = false;
          var FourSecond;

          while (!FourSecondValid) {
            FourSecond = this.getCharacter(); // If two consonants, If allowed rules exist on previous character

            if (FourSecond.type === _enums.CharacterType.Vowel) {
              FourSecondValid = true;
            } else {
              if (FourSecond.rules && FourSecond.rules.allowed && FourSecond.rules.allowed.after && FourSecond.rules.allowed.after.includes(FourFirst.name)) {
                FourSecondValid = true;
              }
            }
          }

          syllable.push(FourSecond);
          var FourThird;

          if (FourSecond.type === _enums.CharacterType.Vowel) {
            FourThird = this.getCharacter(_enums.CharacterType.Consonant);
          } else {
            FourThird = this.getCharacter(_enums.CharacterType.Vowel);
          }

          syllable.push(FourThird);
          var FourFourth;
          var FourFourthValid = false;

          while (!FourFourthValid) {
            FourFourth = this.getCharacter(_enums.CharacterType.Consonant); // CCVC

            if (FourThird.type === _enums.CharacterType.Vowel) {
              FourFourthValid = true;
            } // CVCC
            else {
                if (FourFourth.rules && FourFourth.rules.allowed && FourFourth.rules.allowed.after && FourFourth.rules.allowed.after.includes(FourThird.name)) {
                  FourFourthValid = true;
                }
              }
          }

          syllable.push(FourFourth);
          break;

        case 5:
          // CCVCC
          var FiveFirst = this.getCharacter(_enums.CharacterType.Consonant);
          syllable.push(FiveFirst);
          var FiveSecond;
          var FiveSecondValid = false;

          while (!FiveSecondValid) {
            FiveSecond = this.getCharacter(_enums.CharacterType.Consonant); // If two consonants, If allowed rules exist on previous character

            if (FiveSecond.rules && FiveSecond.rules.allowed && FiveSecond.rules.allowed.after && FiveSecond.rules.allowed.after.includes(FiveFirst.name)) {
              FiveSecondValid = true;
            }
          }

          syllable.push(FiveSecond);
          var FiveThird = this.getCharacter(_enums.CharacterType.Vowel);
          syllable.push(FiveThird);
          var FiveFourth = this.getCharacter(_enums.CharacterType.Consonant);
          syllable.push(FiveFourth);
          var FiveFifth;
          var FiveFifthValid = false;

          while (!FiveFifthValid) {
            FiveFifth = this.getCharacter(_enums.CharacterType.Consonant); //  If allowed rules exist on previous character

            if (FiveFifth.rules && FiveFifth.rules.allowed && FiveFifth.rules.allowed.after && FiveFifth.rules.allowed.after.includes(FiveFourth.name)) {
              FiveFifthValid = true;
            }
          }

          syllable.push(FiveFifth);
          break;
      }

      return syllable;
    }
  }, {
    key: "generateNouns",
    value: function generateNouns() {
      var nouns = _templates.nounTemplate;
      return nouns;
    }
  }, {
    key: "generateVerbs",
    value: function generateVerbs() {
      var verbs = _templates.verbTemplate;
      return verbs;
    }
  }, {
    key: "generateAdjectives",
    value: function generateAdjectives() {
      var adjectives;
      adjectives = {
        prefix: ['']
      };
      return adjectives;
    }
  }, {
    key: "generateAdverbs",
    value: function generateAdverbs() {
      var adverbs;
      adverbs = {
        prefix: ['']
      };
      return adverbs;
    }
  }, {
    key: "getCharacter",
    value: function getCharacter() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _enums.CharacterType.Random;
      var character;

      switch (type) {
        case _enums.CharacterType.Consonant:
          character = this.getConsonant();
          break;

        case _enums.CharacterType.Vowel:
          character = this.getVowel();
          break;

        default:
          if (this.getRandomNumber(1, 6) >= 3) {
            character = this.getConsonant();
          } else {
            character = this.getVowel();
          }

          break;
      }

      return character;
    }
  }, {
    key: "getConsonant",
    value: function getConsonant() {
      var consonants = this.alphabet.filter(function (character) {
        return character.type === _enums.CharacterType.Consonant;
      });
      var key = this.getRandomNumber(0, consonants.length);
      var consonant = consonants[key];
      return consonant;
    }
  }, {
    key: "getVowel",
    value: function getVowel() {
      var vowels = this.alphabet.filter(function (character) {
        return character.type === _enums.CharacterType.Vowel;
      });
      var key = this.getRandomNumber(0, vowels.length);
      var vowel = vowels[key];
      return vowel;
    }
  }, {
    key: "getRandomNumber",
    value: function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    /*
    * Returns IAlphabet[] as some repair strategies use multiple characters
    */

  }, {
    key: "FixWord",
    value: function FixWord(word) {
      console.log(word);
      return word.map(function (syllable, key) {
        if (key === 0) return syllable;

        var newSyllable = _objectSpread({}, syllable); // Check double consonant && consecutive vowels


        var prevWord = word[key - 1];

        if (prevWord[prevWord.length - 1].type === _enums.CharacterType.Consonant && prevWord[prevWord.length - 1].name === syllable[0].name || prevWord[prevWord.length - 1].type === _enums.CharacterType.Vowel && syllable[0].type === _enums.CharacterType.Vowel) {
          newSyllable.shift();
        }

        return syllable;
      });
    }
  }]);

  return Ussurian;
}();

exports["default"] = Ussurian;