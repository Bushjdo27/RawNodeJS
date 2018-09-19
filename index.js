const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const handlers = require('./lib/handlers')
const helpers = require('./lib/helpers')



const server = http.createServer(function(req ,res){
    //res.end("hello")
    
    unifiedServer(req ,res)
})

const unifiedServer = function(req ,res){
    const parseURL = url.parse(req.url , true);
    const pathName = parseURL.pathname
    const trimmedPath = pathName.replace(/^\/+|\/+$/g,'');
    const headers = req.headers;
    const method = req.method.toLowerCase();
    const queryStringObject = parseURL.query;
    let buffer = "";
    const decode = new StringDecoder('utf-8');

    req.on("data",function(data){
        buffer += decode.write(data)
    })
    req.on("end",function(){
        buffer += decode.end()
        const choosenHandler = typeof(routes[trimmedPath]) !== "undefined" ? routes[trimmedPath] : routes.notFound
        const data = {
            headers,
            method,
            queryStringObject,
            payload : helpers.parseJsonToObject(buffer),
            trimmedPath
        }
        choosenHandler(data , function(statusCode , payload){
            statusCode = typeof(status) == "number" ? status : 404;
            payload = typeof(payload) === "object" ? payload : {}
            res.writeHead(statusCode)
            res.end(JSON.stringify(payload))
        })
    })
}




const routes = {
    home: handlers.home,
    notFound: handlers.notFound,
    users: handlers.users
}

server.listen(3000 , ()=>{
    console.log("Server is starting")
})