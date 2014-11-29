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
1. HTML input
<pre>
&lt;head&gt;
    &lt;title&gt;rockdragon/bravo&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div class=&quot;wrapper&quot;&gt;
    &lt;h1&gt;example repository.&lt;/h1&gt;
&lt;/div&gt;
</pre>

2. configuration
example.json:
```JSON
{
  "title": {
    "expr": "&lt;title&gt;([^&lt;]+)&lt;/title&gt;",
    "g": 1
  },
  "heading": {
    "expr": "&lt;div class=\"wrapper\"&gt;\\s+&lt;h1&gt;([^<]+)&lt;/h1&gt;",
    "g": 1
  }
}
```

3. invocation

```javascript
//var html = readFromFile();
var request = require('bravo');
var jsonFile = path.join(process.cwd(), 'example.json');
var obj = bravo.Parse(jsonFile, html);
console.log(obj)
});
```

4. result

```shell
{ title: 'rockdragon/bravo', heading: 'example repository.' }
```

License
======
MIT