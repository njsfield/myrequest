const request = require('./myrequest.js');
const test = require('tape');

const getOptions = {
  url: 'http://httpbin.org/get',
  headers: {
    "Accept": "text/html"
  },
  method: 'get'
};

const postOptions = {
  url: 'http://httpbin.org/post',
  headers: {
    "Accept": "application/json"
  },
  method: 'post',
  form: {
    client_id: '123455',
    client_secret: '78987',
    redirect_uri: 'localhost:8080/welcome',
    code: '12345'
  }
};

test('It should return data on get request', (t) => {
  // Tests 'get' method defined in options
  request(getOptions, (err, response, body)=> {
    t.ok(!err, 'Shouldnt throw an error');
    t.equals(JSON.parse(response).url, "http://httpbin.org/get", "should return body of information");
  });
  // Tests get method as method
  request.get(getOptions, (err, response, body)=> {
    t.ok(!err, 'Shouldnt throw an error');
    t.equals(JSON.parse(response).url, "http://httpbin.org/get", "should return body of information");
  });
  // Tests get method with simple url
  request.get('http://httpbin.org/get', (err, response, body)=> {
    t.ok(!err, 'Shouldnt throw an error');
    t.equals(JSON.parse(response).url, "http://httpbin.org/get", "should return body of information");
    t.end();
  });

});

test('It should return data on post request', (t) => {
  // Tests 'get' method defined in options
  request(postOptions, (err, response, body)=> {
    t.ok(!err, 'Shouldnt throw an error');
    t.equals(JSON.parse(response).url, "http://httpbin.org/post", "should return url");
    t.equals(JSON.parse(body), 'client_id=123455&client_secret=78987&redirect_uri=localhost%3A8080%2Fwelcome&code=12345', 'should return data');
  });
  // Tests get method as method
  request.post(postOptions, (err, response, body)=> {
    t.ok(!err, 'Shouldnt throw an error');
    t.equals(JSON.parse(response).url, "http://httpbin.org/post", "should return url");
    t.equals(JSON.parse(body), 'client_id=123455&client_secret=78987&redirect_uri=localhost%3A8080%2Fwelcome&code=12345', 'should return data');
    t.end();
  });
});
