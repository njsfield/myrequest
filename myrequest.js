const https = require('https');
const http = require('http');
const querystring = require('querystring');
const url = require('url');

// Standard methods
const myRequest = (options, cb) => {
  let protocol = (options.protocol === 'https') ? https : http;
  let httpOptions;

  if (options instanceof Object) {
    httpOptions = {};
    httpOptions.protocol = url.parse(options.url).protocol;
    httpOptions.host     = url.parse(options.url).host;
    httpOptions.path     = url.parse(options.url).path;
    httpOptions.headers  = options.headers;
    httpOptions.method   = options.method;
  } else {
    httpOptions = options;
  }

  let myReq = protocol.request(httpOptions, (res) => {
    let rawData = '';
    res.on('data', (chunk) => {
      rawData += chunk;
    });
    res.on('end', () => {
      cb(null, rawData, JSON.stringify(JSON.parse(rawData).data));
    });
  });

  if (options.form && options.method === 'post'){
    let payload = querystring.stringify(options.form);
    httpOptions.headers['Content-Length'] = Buffer.byteLength(payload);
    myReq.write(payload);
  }
  myReq.end();
};

// Additional get/post methods
myRequest.get = (options, cb) => {
  options.method = 'get';
  myRequest(options,cb);
};
myRequest.post = (options, cb) => {
  options.method = 'post';
  myRequest(options,cb);
};


module.exports = myRequest;
