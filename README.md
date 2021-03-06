bravo
======
[![Build Status](https://travis-ci.org/rockdragon/bravo.svg?branche=master)](https://travis-ci.org/rockdragon/bravo) [![Coverage Status](https://coveralls.io/repos/rockdragon/bravo/badge.png?branche=master)](https://coveralls.io/r/rockdragon/bravo) [![npm version](https://badge.fury.io/js/bravo.svg?branche=master)](http://badge.fury.io/js/bravo) [![Dependency Status](https://david-dm.org/rockdragon/bravo.svg?branche=master)](https://david-dm.org/rockdragon/bravo)

[![https://www.npmjs.org/package/bravo](https://nodei.co/npm/bravo.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.org/package/bravo)

simplified Regular Expression pattern match framework based on RegExp.

Requirements
======
* Node 0.10+
* Able to write regular expression

Installation
======
```
	$ npm install bravo
```

Run
======
* HTML input:
<pre>
&lt;head&gt;
    &lt;title&gt;rockdragon/bravo&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div class=&quot;wrapper&quot;&gt;
    &lt;h1&gt;example repository.\r\n&lt;/h1&gt;
&lt;/div&gt;
</pre>

* JSON-like configuration file:
   * {expr} represents either regular expression string, or an array composed of : [{ expr:"", g:1},...]
   * {g} represents either the group number of the RegExp; return the all groups if {g} absent; it should not exist when {expr} was an array.
   * {sep} represents a separator be used to concatenate result when {expr} was an array.
   * {replace} is used for result substitution, it could be either an array or an object whose contains two fields : {a} represent source, and {b} represent destination.

```JSON
{
  "title": {
    "expr": "<title>([^<]+)</title>",
    "g": 1
  },
  "heading": {
    "expr": "<div class=\"wrapper\">\\s+<h1>([^<]+)</h1>",
    "g": 1,
    "replace": [
      {
        "a": "\\\\r\\\\n",
        "b": ""
      },
      {
        "a": "example",
        "b": "awesome"
      }
    ]
  },
  "titleAndheading": {
    "expr": [
      {
        "expr": "<title>([^<]+)</title>",
        "g": 1
      },
      {
        "expr": "<div class=\"wrapper\">\\s+<h1>([^<]+)</h1>",
        "g": 1
      }
    ],
    "sep": " - ",
    "replace": [
      {
        "a": "\\\\r\\\\n",
        "b": ""
      },
      {
        "a": "example",
        "b": "awesome"
      }
    ]
  }
}
```     

* Invocation:

```javascript
//var html = readFromFile();
var request = require('bravo');
var jsonFile = path.join(process.cwd(), 'example.json');
var obj = bravo.Parse(jsonFile, html);
console.log(obj)
});
```

* Result is a object which had been defined in the JSON file:

```shell
{ title: 'rockdragon/bravo',
  heading: 'awesome repository.',
  titleAndheading: 'rockdragon/bravo - awesome repository.' }
```

License
======
MIT