var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
/*
보시는 바와 같이, 다른 URL을 동일한 request handler에 매핑하는 것은 매우 쉽습니다.
키/값 쌍에 "/"와 requestHandlers.start 를 추가하면
/start 요청뿐 아니라 / 요청도 start handler로 연결됩니다.
*/

server.start(router.route, handle);