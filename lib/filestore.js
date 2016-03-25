'use strict';

var util = require('util'),
    fs = require('fs'),
    tough = require('tough-cookie'),
    Store = tough.MemoryCookieStore;

function FileCookieStore(filePath) {
    Store.call(this);
    this.idx = {}; // idx is memory cache
    this.filePath = filePath;
    var self = this;
    loadFromFile(this.filePath, function (dataJson) {
        if (dataJson)
            self.idx = dataJson;
    })
}
util.inherits(FileCookieStore, Store);
exports.FileCookieStore = FileCookieStore;

FileCookieStore.prototype.putCookie = function (cookie, cb) {
    if (!this.idx[cookie.domain]) {
        this.idx[cookie.domain] = {};
    }
    if (!this.idx[cookie.domain][cookie.path]) {
        this.idx[cookie.domain][cookie.path] = {};
    }
    this.idx[cookie.domain][cookie.path][cookie.key] = cookie;
    saveToFile(this.filePath, this.idx, function () {
        cb(null);
    });
};

FileCookieStore.prototype.removeCookie = function removeCookie(domain, path, key, cb) {
    if (this.idx[domain] && this.idx[domain][path] && this.idx[domain][path][key]) {
        delete this.idx[domain][path][key];
    }
    saveToFile(this.filePath, this.idx, function () {
        cb(null);
    });
};

FileCookieStore.prototype.removeCookies = function removeCookies(domain, path, cb) {
    if (this.idx[domain]) {
        if (path) {
            delete this.idx[domain][path];
        } else {
            delete this.idx[domain];
        }
    }
    saveToFile(this.filePath, this.idx, function () {
        return cb(null);
    });
};

function saveToFile(filePath, data, cb) {
    var dataJson = JSON.stringify(data);
    fs.writeFileSync(filePath, dataJson);
    cb();
}

function loadFromFile(filePath, cb) {
    var data = fs.readFileSync(filePath, {encoding: 'utf8', flag: 'a+'});
    var dataJson = data ? JSON.parse(data) : null;
    for (var domainName in dataJson) {
        for (var pathName in dataJson[domainName]) {
            for (var cookieName in dataJson[domainName][pathName]) {
                dataJson[domainName][pathName][cookieName] = tough.fromJSON(JSON.stringify(dataJson[domainName][pathName][cookieName]));
            }
        }
    }
    cb(dataJson);
}
