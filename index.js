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
 {expr} represents either regular expression string, or an array composed of : [{ expr:"", g:1} ...]
 {g} represents either the group number of the RegExp; return the all groups if {g} absent; it should not exist when {expr} was an array.
 {sep} represents a separator be used to concatenate result when {expr} was an array.
 {replace} is used for result substitution, it could be either an array or an object whose contains two fields : {a} represent source, and {b} represent destination.
 */
var fs = require('fs');

module.exports.Parse = Parse;
function Parse(jsonFile, input) {
    var obj = {}, jsonObj = null;
    try {
        var json = fs.readFileSync(jsonFile, {flag: 'r'}).toString();
        jsonObj = JSON.parse(json);

        for (var key in jsonObj) {
            var regObj = jsonObj[key];
            var expr = regObj.expr, g = regObj.g, sep = regObj.sep || '',
                replace = regObj.replace;
            if (isString(expr)) {
                obj[key] = matchByExpr(input, expr, g);
            } else if (isArray(expr)) {
                var buffer = [];
                for (var j = 0, len = expr.length; j < len; j++) {
                    buffer.push(matchByExpr(input, expr[j].expr, expr[j].g));
                }
                obj[key] = buffer.join(regObj.sep);
            }
            if (obj[key] && replace) {
                if (isArray(replace)) {
                    for (var i = 0, len = replace.length; i < len; i++) {
                        replaceByExpr(obj, key, replace[i].a, replace[i].b);
                    }
                } else {
                    replaceByExpr(obj, key, replace.a, replace.b);
                }
            }
        }
    } catch (e) {
        console.log('[reading JSON error]', e.stack);
    }
    return obj;
}

/*
 * utilities
 * */
function getObjectType(obj) {
    return Object.prototype.toString.call(obj);
}
function isArray(obj) {
    return getObjectType(obj) === '[object Array]';
}
function isString(obj) {
    return getObjectType(obj) === '[object String]';
}
function matchByExpr(input, expr, g) {
    var match = new RegExp(expr, 'gmi').exec(input);
    if (match) {
        return g ? match[g] : match;
    }
    return null;
}
function replaceByExpr(obj, key, a, b) {
    var source = new RegExp(a, 'gmi');
    obj[key] = obj[key].replace(source, b);
}