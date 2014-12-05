var fs = require('fs');
var path = require('path');
var bravo = require('../index');
require('should');

describe('bravo testing', function () {
    it('result integrality checking', function () {
        var htmlFile = path.join(process.cwd(), 'example', 'git.html');
        var html = fs.readFileSync(htmlFile, {flag: 'r'});
        var jsonFile = path.join(process.cwd(), 'example', 'git.json');
        var obj = bravo.Parse(jsonFile, html);
        obj.should.not.equal(null);
        obj['title'].should.not.equal(null);
        obj['title'].should.equal('rockdragon/bravo');
        obj['heading'].should.not.equal(null);
        obj['heading'].should.equal('awesome repository.');
        obj['titleAndheading'].should.equal('rockdragon/bravo - awesome repository.');
    });
});

