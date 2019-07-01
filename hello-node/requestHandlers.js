/*
이 시점에 결정이 필요합니다: requestHandler 모듈을 router에 하드코딩 된 방식으로 묶을 것이냐,
아니면 의존관계 주입(dependency injection)으로 좀 더 처리할 것이냐?
모든 패턴과 마찬가지로 의존 관계 주입은 그 자체를 위해 사용하는 것이 아닙니다.
여기에서는 router와 request handler를 느슨하게 묶어서 router의 재사용을 크게 높입니다.

이렇게 하려면 request handler를 server에서 router로 전달해야 하는데, 이건 더 잘못된 느낌을 줍니다.
왜냐하면 main 파일에서 server로 보내고 server에서 router로 보내야 하기 때문이죠.

그럼 어떻게 전달하는 게 좋을까요? 지금은 두 개의 handler가 있지만
실제 애플리케이션에서는 handler의 수가 늘어나고 다양해 질 겁니다.
그리고 새 URL request handler가 추가될 때마다
router에서 request와 handler를 매핑하는 일을 하고 싶진 않습니다.
게다가 if request == x then call handler y와 같은 코드는 추악함 이상이 될겁니다.
*/
var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

function start(response, postData) {
  console.log("Request handler 'start' was called.");

  /*
  var content = "empty";
  exec("find /",
    { timeout: 10000, maxBuffer: 20000*1024 },
    function (error, stdout, stderr) {
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write(stdout);
      response.end();
    });
  */

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" />'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(body);
  response.end();
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  console.log("about to parse");

  form.parse(request, function(error, fields, files) {
    console.log("parsing done");
    // 경로 최하위 폴더까지 존재해야 함
    fs.renameSync(files.upload.path,
      "/Users/heedo/react-playground/hello-node/uploads/test.png");
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write("received image:<br />");
      response.write("<img src='/show' />");
      response.end();
  });

}

function show(response) {
  console.log("Request handler 'show' was called.");
  fs.readFile(
    "/Users/heedo/react-playground/hello-node/uploads/test.png",
    "binary",
    function(error, file) {
      if(error) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(error + "\n");
        response.end();
      } else {
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");
        response.end();
      }
    }
  );
}

exports.start = start;
exports.upload = upload;
exports.show = show;