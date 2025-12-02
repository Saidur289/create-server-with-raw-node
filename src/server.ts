import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config/config";
import  { routes } from "./helpers/RouteHandlers";
import "./routes"
import findDynamicRoute from "./helpers/findDynamicRouteHandler";




const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
 console.log("Server is running...........");
 //root route
 const path = req.url || ""
 const method = req.method?.toUpperCase() || "";
 const methodMap = routes.get(method);
 const handler    = methodMap?.get(path) || ""

 if(handler){
  handler(req, res)
 }

 else if(findDynamicRoute(method, path)){
    const match = findDynamicRoute(method, path);
    (req as any).params = match?.params
    match?.handler(req, res)
 }
 
 else{
    res.writeHead(404, {"content-type": "application/json"});
    res.end(JSON.stringify({
        success: false,
        message: "Route not found",
        path
    }))
 }
//  if(req.url == "/" && req.method == "GET"){
//     res.writeHead(200, {"content-type": "application/json"})
//     res.end(
//         JSON.stringify({
//             message: "Hello from node js with typescript.....",
//             path: req.url
//         })
//     )
//  }
 // health route 
//  if(req.url == "/api" &&  req.method === "GET"){
// res.writeHead(200, {"content-type": "application/json"})
//     res.end(
//         JSON.stringify({
//             message: "Health Status.....",
//             path: req.url
//         })
//     )
//  }
//  if(req.url === "/api/users" && req.method === "POST"){
//     // const user = {id: 25, name: "Saidur Rahman"}
//     // res.writeHead(200, {"content-type": "application/json"})
//     // res.end(
//     //     JSON.stringify(user)
//     // )
//     let body = "";
//     req.on("data", (chunk) => {
//         body += chunk.toString();
//     })
//     req.on("end", () => {
//         try {
//             const parseBody = JSON.parse(body)
//            console.log(parseBody)
//            res.end(JSON.stringify(parseBody))
//         } catch (err: any) {
//             console.log(err?.message);
//         }
//     })
    
//  }
})
//listen
server.listen(config.port, () => {
 console.log(`Server is running on port ${config.port}`);
})