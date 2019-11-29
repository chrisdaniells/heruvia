"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonNounSuffixes = exports.SyllablePositions = exports.StressPositions = exports.CharacterType = void 0;
var CharacterType;
exports.CharacterType = CharacterType;

(function (CharacterType) {
  CharacterType["Vowel"] = "v";
  CharacterType["Consonant"] = "c";
  CharacterType["Random"] = "r";
})(CharacterType || (exports.CharacterType = CharacterType = {}));

var StressPositions;
exports.StressPositions = StressPositions;

(function (StressPositions) {
  StressPositions["First"] = "first";
  StressPositions["Second"] = "second";
  StressPositions["Third"] = "third";
  StressPositions["Forth"] = "forth";
  StressPositions["Fifth"] = "fifth";
  StressPositions["Last"] = "last";
  StressPositions["Penultimate"] = "penultimate";
})(StressPositions || (exports.StressPositions = StressPositions = {}));

var SyllablePositions;
exports.SyllablePositions = SyllablePositions;

(function (SyllablePositions) {
  SyllablePositions["Pre"] = "pre";
  SyllablePositions["Circum"] = "circum";
  SyllablePositions["Post"] = "post";
  SyllablePositions["Any"] = "any";
})(SyllablePositions || (exports.SyllablePositions = SyllablePositions = {}));

var CommonNounSuffixes;
exports.CommonNounSuffixes = CommonNounSuffixes;

(function (CommonNounSuffixes) {
  CommonNounSuffixes["This"] = "this";
  CommonNounSuffixes["That"] = "that";
  CommonNounSuffixes["Every"] = "every";
  CommonNounSuffixes["Any"] = "any";
  CommonNounSuffixes["Some"] = "some";
  CommonNounSuffixes["Like"] = "like";
  CommonNounSuffixes["Which"] = "which";
  CommonNounSuffixes["Near"] = "near";
  CommonNounSuffixes["Top"] = "top";
  CommonNounSuffixes["Over"] = "over";
  CommonNounSuffixes["Under"] = "under";
  CommonNounSuffixes["Above"] = "above";
  CommonNounSuffixes["Below"] = "below";
  CommonNounSuffixes["Behind"] = "behind";
  CommonNounSuffixes["Front"] = "front";
  CommonNounSuffixes["Before"] = "before";
  CommonNounSuffixes["After"] = "after";
  CommonNounSuffixes["Beside"] = "beside";
  CommonNounSuffixes["Towards"] = "towards";
  CommonNounSuffixes["Away"] = "away";
  CommonNounSuffixes["To"] = "to";
})(CommonNounSuffixes || (exports.CommonNounSuffixes = CommonNounSuffixes = {}));