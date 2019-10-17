"use strict";

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ussurian = new _index["default"]();
var word = ussurian.generateRoot();
console.log(word);
var typed = [];
word.flat().forEach(function (c, key) {
  typed.push(key !== 0 ? c.romanised.lowercase : c.romanised.uppercase);
});
console.log(typed.join(''));