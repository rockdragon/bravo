(function () {
    var fs = require('fs');
    var path = require('path');
    var bravo = require('../index');

    var htmlFile = path.join(process.cwd(), 'git.html');
    var html = fs.readFileSync(htmlFile, {flag: 'r'});

    var jsonFile = path.join(process.cwd(), 'git.json');
    var obj = bravo.Parse(jsonFile, html);
    console.log(obj);
})();
