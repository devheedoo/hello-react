var http = require("http");
var url = require("url");

/*
새로운 접근 방법은 다음과 같습니다:
content를 server로 보내는 대신 server를 content로 보낼겁니다.
좀 더 자세히 이야기 하면, response 객체 (server의 callback 함수인
onRequest() 에서 얻은)를 router를 통해
request handler에게 주사(inject) 합니다.
이제 handler는 이 객체가 가진 함수들을 이용해서
스스로 요청에 응답할 수 있게 되었습니다.
*/

/*
제 생각에, request 로부터 오는 모든 data를 애플리케이션에게 전달하는 것은
HTTP server의 역할입니다.
그래서 POST data를 server에서 받고 최종 data를 router와
request handler로 보내는 게 좋겠습니다.
그러면 그것으로 무엇을 할지 결정할 수 있겠죠.

그러니까 data와 end 이벤트 callback을 server에 두고
data callback에서 모든 POST 데이터 청크를 모은 다음에,
end callback에서 router를 호출하면서 모든 데이터 청크를 전달합니다.
그러면 결국 request handler 까지 갈 겁니다.
*/

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    route(handle, pathname, response, request);
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;