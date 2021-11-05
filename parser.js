// mygenerator.js
var Parser = require("jison").Parser;
// a grammar in JSON
var grammar = {
    "comment": "JSON Math Parser",
    // JavaScript comments also work
    "lex": {
       "rules": [
          ["\\s+",                    "/* skip whitespace */"],
          ["[0-9]+(?:\\.[0-9]+)?\\b", "return 'NUMBER'"],
          ["\\*",                     "return '*'"],
          ["\\/",                     "return '/'"],
          ["-",                       "return '-'"],
          ["\\+",                     "return '+'"],
          ["\\^",                     "return '^'"],
          ["√",                       "return '√'"], 
          ["\\(",                     "return '('"],
          ["\\)",                     "return ')'"],
          ["$",                       "return 'EOF'"], 
          ["calculate",               "return 'CALCULATE'"]
       ]
    },
 
    "operators": [
       ["left", "+", "-"],
       ["left", "*", "/"],
       ["left", "^","√"],
       ["left", "UMINUS"]
    ],
 
    "bnf": {
       "expressions": [["CALCULATE e EOF",   "return $2"]],
 
       "e" :[
          ["e + e",  "$$ = $1+$3"],
          ["e - e",  "$$ = $1-$3"],
          ["e * e",  "$$ = $1*$3"],
          ["e / e",  "$$ = $1/$3"],
          ["e ^ e",  "$$ = Math.pow($1, $3)"],
          ["- e",    "$$ = -$2", {"prec": "UMINUS"}],
          ["+ e",    "$$ = +$2", {"prec": "UMINUS"}],
          ["( e )",  "$$ = $2"],
          ["NUMBER", "$$ = Number(yytext)"],
          ["√ e",      "$$ = Math.sqrt($2)"],
  
       ]
    }
 }

// `grammar` can also be a string that uses jison's grammar format
var parser = new Parser(grammar);

// generate source, ready to be written to disk
var parserSource = parser.generate();

// you can also use the parser directly from memory

// returns true

// throws lexical error
//parser.parse("1++");

module.exports= parser