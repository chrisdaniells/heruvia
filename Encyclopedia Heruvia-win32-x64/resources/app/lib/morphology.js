"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var nouns = {
  cases: {
    nom: {
      singular: {
        first: [''],
        second: [''],
        third: [''],
        masculine: [''],
        feminine: ['']
      },
      minority: {
        first: [''],
        second: [''],
        third: [''],
        masculine: [''],
        feminine: ['']
      },
      majority: {
        first: [''],
        second: [''],
        third: [''],
        masculine: [''],
        feminine: ['']
      }
    },
    acc: {
      singular: {
        first: [''],
        second: [''],
        third: [''],
        masculine: [''],
        feminine: ['']
      },
      minority: {
        first: [''],
        second: [''],
        third: [''],
        masculine: [''],
        feminine: ['']
      },
      majority: {
        first: [''],
        second: [''],
        third: [''],
        masculine: [''],
        feminine: ['']
      }
    },
    dat: {
      singular: {
        first: [''],
        second: [''],
        third: [''],
        masculine: [''],
        feminine: ['']
      },
      minority: {
        first: [''],
        second: [''],
        third: [''],
        masculine: [''],
        feminine: ['']
      },
      majority: {
        first: [''],
        second: [''],
        third: [''],
        masculine: [''],
        feminine: ['']
      }
    },
    gen: {
      singular: {
        first: [''],
        second: [''],
        third: [''],
        masculine: [''],
        feminine: ['']
      },
      minority: {
        first: [''],
        second: [''],
        third: [''],
        masculine: [''],
        feminine: ['']
      },
      majority: {
        first: [''],
        second: [''],
        third: [''],
        masculine: [''],
        feminine: ['']
      }
    }
  },
  pronouns: {
    human: [''],
    entity: ['']
  },
  suffixes: {
    common: {
      "this": [''],
      that: [''],
      every: [''],
      any: [''],
      some: [''],
      like: [''],
      which: [''],
      near: [''],
      top: [''],
      above: [''],
      under: [''],
      below: [''],
      behind: [''],
      before: [''],
      beside: [''],
      after: [''],
      towards: [''],
      away: [''],
      to: ['']
    },
    seasonal: {
      summer: [''],
      winter: [''],
      autumn: [''],
      spring: ['']
    }
  }
};
var verbs = {
  formal: {
    pst: {
      perf: {
        exp: [''],
        // eyewitness
        rep: [''],
        // reported
        hsy: [''],
        // heresay
        ass: [''] // assumptive

      },
      prog: {
        imp: [''],
        // command
        spec: [''],
        // speculative
        cap: [''] // ability

      },
      hist: {
        exp: [''],
        // eyewitness
        rep: [''],
        // reported
        hsy: [''],
        // heresay
        ass: [''] // assumptive

      },
      rec: {
        exp: [''],
        // eyewitness
        rep: [''],
        // reported
        hsy: [''],
        // heresay
        ass: [''] // assumptive

      }
    },
    pres: {
      prog: {
        ass: [''],
        // assumptive
        spec: [''],
        // speculative
        cap: [''],
        // ability
        imp: [''] // command/criticism

      }
    },
    fut: {
      imm: {
        ass: [''],
        // assumptive
        imp: [''] // command

      },
      prog: {
        cap: [''] // ability

      },
      perfprog: {
        ass: [''] // assumptive

      }
    }
  },
  informal: {
    pst: {
      simp: [''],
      prog: [''],
      perf: [''],
      perfprog: ['']
    },
    pres: {
      simp: [''],
      prog: [''],
      perf: [''],
      perfprog: ['']
    },
    fut: {
      simp: [''],
      prog: [''],
      perf: [''],
      perfprog: ['']
    }
  }
};
var adverbs = {
  prefix: ['']
};
var adjectives = {
  prefix: ['']
};
var morphology = {
  nouns: nouns,
  verbs: verbs,
  adverbs: adverbs,
  adjectives: adjectives
};
var _default = morphology;
exports["default"] = _default;