var http = require("http");
var url = require("url");

/*
새로운 접근 방법은 다음과 같습니다:
content를 server로 보내는 대신 server를 content로 보낼겁니다.
좀 더 자세히 이야기 하면, response 객체 (server의 callback 함수인 onRequest() 에서 얻은)를
router를 통해 request handler에게 주사(inject) 합니다.
이제 handler는 이 객체가 가진 함수들을 이용해서 스스로 요청에 응답할 수 있게 되었습니다.
*/

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    route(handle, pathname, response);
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;