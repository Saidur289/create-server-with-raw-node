
import { IncomingMessage } from "http";

async function ParseBody(req: IncomingMessage): Promise<any> {
    return new Promise((resolve, rejects) => {
            let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString();
    })
    req.on("end", () => {
        try {
            resolve(body? JSON.parse(body) : {})
           
        } catch (err: any) {
           rejects(err)
        }
    })
    req.on("error", rejects)
    })
    
}
export default ParseBody