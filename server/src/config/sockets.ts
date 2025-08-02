import { DefaultEventsMap, Server } from "socket.io";

export function socketConfig(io:Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>){
    io.on("connection",(socket)=>{
        socket.on("movement",(stepsId:string)=>{
            io.emit("movement",stepsId);
        })
        socket.on("midnight",()=>{
            io.emit("midnight");
        })
    })
}