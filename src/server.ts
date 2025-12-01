import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config/config";
const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
 console.log("Server is running...........");
 //root route
 if(req.url == "/" && req.method == "GET"){
    res.writeHead(200, {"content-type": "application/json"})
    res.end(
        JSON.stringify({
            message: "Hello from node js with typescript.....",
            path: req.url
        })
    )
 }
 // health route 
 if(req.url == "/api" &&  req.method === "GET"){
res.writeHead(200, {"content-type": "application/json"})
    res.end(
        JSON.stringify({
            message: "Health Status.....",
            path: req.url
        })
    )
 }
 if(req.url === "/api/users" && req.method === "POST"){
    // const user = {id: 25, name: "Saidur Rahman"}
    // res.writeHead(200, {"content-type": "application/json"})
    // res.end(
    //     JSON.stringify(user)
    // )
    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString();
    })
    req.on("end", () => {
        try {
            const parseBody = JSON.parse(body)
           console.log(parseBody)
           res.end(JSON.stringify(parseBody))
        } catch (err: any) {
            console.log(err?.message);
        }
    })
    
 }
})
server.listen(config.port, () => {
 console.log(`Server is running on port ${config.port}`);
})