"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _enums = require("./enums");

var alphabet = [// Vowels
{
  name: 'ada',
  type: _enums.CharacterType.Vowel,
  romanised: {
    lowercase: 'a',
    uppercase: 'A'
  },
  ipa: 'ɑ'
}, {
  name: 'äda',
  type: _enums.CharacterType.Vowel,
  romanised: {
    lowercase: 'ä',
    uppercase: 'Ä'
  },
  ipa: 'ɑ:'
}, {
  name: 'ãda',
  type: _enums.CharacterType.Vowel,
  romanised: {
    lowercase: 'ã',
    uppercase: 'Ã'
  },
  ipa: 'ɑɪ'
}, {
  name: 'ega',
  type: _enums.CharacterType.Vowel,
  romanised: {
    lowercase: 'e',
    uppercase: 'E'
  },
  ipa: 'ɛ'
}, {
  name: 'ëga',
  type: _enums.CharacterType.Vowel,
  romanised: {
    lowercase: 'ë',
    uppercase: 'Ë'
  },
  ipa: 'ɜː'
}, {
  name: 'ẽga',
  type: _enums.CharacterType.Vowel,
  romanised: {
    lowercase: 'ẽ',
    uppercase: 'Ẽ'
  },
  ipa: 'ɛɪ'
}, {
  name: 'ima',
  type: _enums.CharacterType.Vowel,
  romanised: {
    lowercase: 'i',
    uppercase: 'I'
  },
  ipa: 'ɪ'
}, {
  name: 'ïma',
  type: _enums.CharacterType.Vowel,
  romanised: {
    lowercase: 'ï',
    uppercase: 'Ï'
  },
  ipa: 'ɛː'
}, {
  name: 'ĩma',
  type: _enums.CharacterType.Vowel,
  romanised: {
    lowercase: 'ĩ',
    uppercase: 'Ĩ'
  },
  ipa: 'iː'
}, {
  name: 'osa',
  type: _enums.CharacterType.Vowel,
  romanised: {
    lowercase: 'o',
    uppercase: 'O'
  },
  ipa: 'ɒ'
}, {
  name: 'ösa',
  type: _enums.CharacterType.Vowel,
  romanised: {
    lowercase: 'ö',
    uppercase: 'Ö'
  },
  ipa: 'ɔː'
}, {
  name: 'õsa',
  type: _enums.CharacterType.Vowel,
  romanised: {
    lowercase: 'õ',
    uppercase: 'Õ'
  },
  ipa: 'ɔɪ'
}, {
  name: 'uba',
  type: _enums.CharacterType.Vowel,
  romanised: {
    lowercase: 'u',
    uppercase: 'U'
  },
  ipa: 'ʌ'
}, {
  name: 'üba',
  type: _enums.CharacterType.Vowel,
  romanised: {
    lowercase: 'ü',
    uppercase: 'Ü'
  },
  ipa: 'uː'
}, {
  name: 'ũba',
  type: _enums.CharacterType.Vowel,
  romanised: {
    lowercase: 'ũ',
    uppercase: 'Ũ'
  },
  ipa: 'uɪ'
}, // Consonants
{
  name: 'gorsa',
  type: _enums.CharacterType.Consonant,
  romanised: {
    lowercase: 'g',
    uppercase: 'G'
  },
  ipa: 'g',
  rules: {
    allowed: {
      after: ["şüta", "þüta", "sema", "mema", "nema", "taþa", "daþa", "paþa", "baþa"]
    }
  }
}, {
  name: 'korsa',
  type: _enums.CharacterType.Consonant,
  romanised: {
    lowercase: 'k',
    uppercase: 'K'
  },
  ipa: 'k',
  rules: {
    allowed: {
      after: ["şüta", "þüta", "sema", "mema", "nema", "taþa", "daþa", "paþa", "baþa"]
    }
  }
}, {
  name: 'baþa',
  type: _enums.CharacterType.Consonant,
  romanised: {
    lowercase: 'b',
    uppercase: 'B'
  },
  ipa: 'b',
  rules: {
    allowed: {
      after: ["şüta", "þüta", "rüta", "çema", "ðema", "vema", "sema", "mema", "nema"]
    }
  }
}, {
  name: 'paþa',
  type: _enums.CharacterType.Consonant,
  romanised: {
    lowercase: 'p',
    uppercase: 'P'
  },
  ipa: 'p',
  rules: {
    allowed: {
      after: ["şüta", "þüta", "rüta", "çema", "ðema", "vema", "sema", "mema", "nema"]
    }
  }
}, {
  name: 'daþa',
  type: _enums.CharacterType.Consonant,
  romanised: {
    lowercase: 'd',
    uppercase: 'D'
  },
  ipa: 'd',
  rules: {
    allowed: {
      after: ["şüta", "þüta", "rüta", "çema", "ðema", "vema", "sema", "mema", "nema"]
    }
  }
}, {
  name: 'taþa',
  type: _enums.CharacterType.Consonant,
  romanised: {
    lowercase: 't',
    uppercase: 'T'
  },
  ipa: 't',
  rules: {
    allowed: {
      after: ["şüta", "þüta", "rüta", "çema", "ðema", "vema", "sema", "mema", "nema"]
    }
  }
}, {
  name: 'nema',
  type: _enums.CharacterType.Consonant,
  romanised: {
    lowercase: 'n',
    uppercase: 'N'
  },
  ipa: 'n',
  rules: {
    allowed: {
      after: ["şüta", "þüta", "rüta"]
    }
  }
}, {
  name: 'mema',
  type: _enums.CharacterType.Consonant,
  romanised: {
    lowercase: 'm',
    uppercase: 'M'
  },
  ipa: 'm',
  rules: {
    allowed: {
      after: ["şüta", "þüta", "rüta"]
    }
  }
}, {
  name: 'sema',
  type: _enums.CharacterType.Consonant,
  romanised: {
    lowercase: 's',
    uppercase: 'S'
  },
  ipa: 's',
  rules: {
    allowed: {
      after: ["şüta", "þüta", "rüta"]
    }
  }
}, {
  name: 'vema',
  type: _enums.CharacterType.Consonant,
  romanised: {
    lowercase: 'v',
    uppercase: 'V'
  },
  ipa: 'β',
  rules: {
    allowed: {
      after: ["şüta", "þüta", "rüta"]
    }
  }
}, {
  name: 'ðema',
  type: _enums.CharacterType.Consonant,
  romanised: {
    lowercase: 'ð',
    uppercase: 'Đ'
  },
  ipa: 'ð',
  rules: {
    allowed: {
      after: ["şüta", "þüta", "rüta"]
    }
  }
}, {
  name: 'çema',
  type: _enums.CharacterType.Consonant,
  romanised: {
    lowercase: 'ç',
    uppercase: 'Ç'
  },
  ipa: 'tʃ',
  rules: {
    allowed: {
      after: ["şüta", "þüta", "rüta"]
    }
  }
}, {
  name: 'rüta',
  type: _enums.CharacterType.Consonant,
  romanised: {
    lowercase: 'r',
    uppercase: 'R'
  },
  ipa: 'r',
  rules: {
    allowed: {
      after: ["şüta", "þüta", "çema", "ðema", "vema", "sema", "mema", "nema", "taþa", "daþa", "paþa", "baþa", "korsa", "gorsa"]
    }
  }
}, {
  name: 'þüta',
  type: _enums.CharacterType.Consonant,
  romanised: {
    lowercase: 'þ',
    uppercase: 'Ћ'
  },
  ipa: 'θ',
  rules: {
    allowed: {
      after: ["şüta", "rüta", "çema", "ðema", "vema", "sema", "mema", "nema", "taþa", "daþa", "paþa", "baþa", "korsa", "gorsa"]
    }
  }
}, {
  name: 'şüta',
  type: _enums.CharacterType.Consonant,
  romanised: {
    lowercase: 'ş',
    uppercase: 'Ş'
  },
  ipa: 'ʃ',
  rules: {
    allowed: {
      after: ["rüta", "þüta", "çema", "ðema", "vema", "sema", "mema", "nema", "taþa", "daþa", "paþa", "baþa", "korsa", "gorsa"]
    }
  }
}];
var orthography = {
  alphabet: alphabet
};
var _default = orthography;
exports["default"] = _default;