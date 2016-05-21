'use strict';
class Parser {
    constructor (delimiter) {
        this.regex = new RegExp('^\\' + this.delimiter + '(.+?)( (.+))?$');
    }

    parse (message) {
        var m = this.regex.exec(message);
        if (m && m.length >= 1) return { command: m[1], arg: m[3] || '' };
        else return false;
    }
}

module.exports = Parser;