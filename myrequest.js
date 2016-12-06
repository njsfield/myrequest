const https = require('https');
const querystring = require('querystring');
const url = require('url');

const myRequest = (options, cb) => {

  let newObj = {};
  newObj.protocol = url.parse(options.url).protocol;
  newObj.host = url.parse(options.url).host;
  newObj.path = url.parse(options.url).path;
  newObj.headers = options.headers;
  newObj.method = options.method;

  if (options.form){
    newObj.headers['Content-Length'] = Buffer.byteLength(querystring.stringify(options.form));
  }

  if (options.method = 'post'){

    let myReq = https.request(newObj, (res) => {
      let rawData = '';
      res.on('data', (chunk) => {
        rawData += chunk
      })
      res.on('end', () => {
        cb(null, rawData)
      })
    })

    myReq.write(querystring.stringify(options.form))
    myReq.end();
  } else {

    let myReq = https.request(newObj, (res) => {
      let rawData = '';
      res.on('data', (chunk) => {
        rawData += chunk
      })
      res.on('end', () => {
        cb(null, rawData)
      })
    })
  };
};

module.exports = myRequest;
