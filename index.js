/*
 @jsonFile  :   jsonFile.json file path
 @input     :   HTML content

 {jsonFile}.json formation example:
     {
         "title": {
             "expr": "<title>([^<]+)</title>",
             "g": 1
         }
     }
 in which:
     {expr} gives the RegExp
     {g} indicates the group number of the RegExp; return the all groups if {g} absent.
 */
var path = require('path');
var fs = require('fs');

module.exports.Parse = Parse;

function Parse(jsonFile, input) {
    var obj = {}, jsonObj = null;
    try {
        var json = fs.readFileSync(jsonFile, {flag: 'r'}).toString();
        jsonObj = JSON.parse(json);

        for (var key in jsonObj) {
            var regObj = jsonObj[key];
            var expr = regObj.expr, g = regObj.g,
                replace = regObj.replace;
            if (expr) {
                var match = new RegExp(expr, 'gmi').exec(input);
                if (match) {
                    obj[key] = g ? match[g] : match;
                }
            }
            if(obj[key] && replace){
                var source = new RegExp(replace.a, 'gmi');
                obj[key] = obj[key].replace(source, replace.b);
            }
        }
    } catch (e) {
        console.log('[reading JSON error]', e.stack);
    }

    return obj;
}