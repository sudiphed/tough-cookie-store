# File Cookie Store

[![NPM](https://nodei.co/npm/tough-cookie-store.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/tough-cookie-store/)
[![build status](https://travis-ci.org/cath-gh/tough-cookie-store.svg?branch=master)](https://travis-ci.org/cath-gh/tough-cookie-store)

tough-cookie-filestore is a File store modified from [tough-cookie-filestore](https://github.com/mitsuru/tough-cookie-filestore),  fully compatible with it. And add some functions needed in use.

## installation

    $ npm install tough-cookie-store

## Usage

```javascript
  var FileCookieStore = require("tough-cookie-store"),
      request = require('request');
  
  var fileStore = new FileCookieStore(filePath, option);
  var jar = request.jar(fileStore);
  var req = request.defaults({jar: jar});
```

## Options

#### `filePath`
  file path of cookie file.
  
#### `option`
with or without encrypt
##### `option.encrypt`
`true` as default, unless explicitly specified as false fileStore will encrypt the cookie file with the default setting.
##### `option.algorithm`
`'aes-256-cbc'`as default, you can use any algorithm nodejs supported.
##### `option.password`
`'tough-cookie-store'`as default.

## API
see [tough-cookie#store-api](https://github.com/SalesforceEng/tough-cookie#store-api)

#### extra API

##### `fileStore.getCookie(domain, path, key)`
sync version of `fileStore.findCookie`, return a cookie object.
##### `fileStore.flush()`
write current cookies to file.
##### `fileStore.isEmpty()`
check if fileStore is empty.

## License

 MIT
