"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _enums = require("./enums");

var stress = {
  "default": {
    primary: _enums.StressPositions.Second,
    secondary: _enums.StressPositions.Last
  },
  rules: [{
    type: 'v',
    position: 0,
    primary: _enums.StressPositions.First
  }]
};
var phonotactics = {
  structure: ['?C', 'V', '?C']
};
var phonology = {
  stress: stress,
  phonotactics: phonotactics
};
var _default = phonology;
exports["default"] = _default;